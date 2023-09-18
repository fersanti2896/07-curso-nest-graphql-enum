import { Injectable, BadRequestException, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { SingUpInput } from '../auth/dto/inputs/signup.input';
import { ValidRoles } from '../auth/enums/valid-roles.enum';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository( User )
    private readonly usersRepository: Repository<User>
  ) {}

  async create( singupInput: SingUpInput ): Promise<User> {
    try { 
      const newUser = this.usersRepository.create({
        ...singupInput,
        password: bcrypt.hashSync( singupInput.password, 10 )
      });

      return await this.usersRepository.save( newUser );
    } catch (error) {
      this.handleDBErrors( error );
    }
  }

  async findAll( roles: ValidRoles[] ): Promise<User[]> {
    if( roles.length === 0 ) return this.usersRepository.find();

    return this.usersRepository.createQueryBuilder()
                               .andWhere('ARRAY[roles] && ARRAY[:...roles]')
                               .setParameter('roles', roles)
                               .getMany();
  }

  async findOneByEmail( email: string ): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ email })
    } catch (error) {
      throw new NotFoundException(`${ email } no fue encontrado.`);
      // this.handleDBErrors({
      //   code: 'error-001',
      //   detail: `${ email } no encontrado`
      // });
    }
  }

  async findOneById( id: string ): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ id })
    } catch (error) {
      throw new NotFoundException(`${ id } no fue encontrado.`);
    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block( id: string ): Promise<User> {
    throw new Error('blockMethod no implementado');
  }

  private handleDBErrors( error: any ): never {
    if( error.code === '23505' ) {
      throw new BadRequestException( error.detail.replace('Key', '') );
    }

    if( error.code === 'error-001' ) {
      throw new BadRequestException( error.detail );
    }

    this.logger.error( error );
    throw new InternalServerErrorException('Favor de verificar los logs del servidor.')
  }
}
