# Anylist - Usuarios y Enumeraciones - Admin Roles

Se continua con el `Backend` de Items, ahora con la creación de usuarios y enumeraciones, los temas que se ven son: 

- Relaciones `ManyToOne` a la misma tabla.
- Actualización de usuarios.
- Bloqueo de usuarios.
- Protección del `GqlSchema`.
- Módulo asíncronos.
- `Factory functions`.
- Uso de módulos en `factory functions`.
- Roles y actualización de usuario que modifica registros.

### Pasos para iniciar API

1. Clonar repositorio e instalar los paquetes de `Node`:
```
npm install
```
2. Renombrar el archivo `.env.template` por `.env` e inicializar las variables de entorno.
3. Montar el contenedor de `Postgres` de Docker:
```
docker-compose up -d
```
4. Iniciar proyecto con:
```
npm run start:dev
```
5. Comprobar en la `URL`:
```
http://localhost:3000/graphql
```