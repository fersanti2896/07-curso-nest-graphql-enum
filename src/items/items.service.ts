import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { Item } from './entities/item.entity';
import { IdentificadorArgs } from './dto/args';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository( Item )
    private readonly itemsRepository: Repository<Item>
  ) {}

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem = this.itemsRepository.create( createItemInput );
    
    return await this.itemsRepository.save( newItem );
  }

  async findAll(): Promise<Item[]> {
    // TODO: Filtrar, paginar, por usuario

    return this.itemsRepository.find();
  }

  async findOne( id: IdentificadorArgs ): Promise<Item> {
    const item = await this.itemsRepository.findOneBy(id);

    if( !item ) throw new NotFoundException(`El item con el id: ${ id.id } no fue encontrado.`);

    return item;
  }

  async update( id: string, updateItemInput: UpdateItemInput ): Promise<Item> {
    const item = await this.itemsRepository.preload( updateItemInput );

    if( !item ) throw new NotFoundException(`El item con el id: ${ updateItemInput.id } no fue encontrado.`);
    
    return this.itemsRepository.save( item );
  }

  async remove( id: IdentificadorArgs ): Promise<Item> {
    // TODO: Soft delete, intregidad referencial
    const item = await this.findOne(id);

    await this.itemsRepository.remove( item );

    return { ...item, id: id.id };
  }
}
