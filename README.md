# Anylist - Autenticación y Autorización

Se continua con el `Backend` de Items, ahora con la parte de Autenticación y Autorización, los temas que se ven son: 

- Protección de `Queries` y `Mutations`.
- Creación de usuarios desde `GraphQL`.
- Autenticación por login.
- Creación de `JWT`.
- Revalidación de token de autenticación. 

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