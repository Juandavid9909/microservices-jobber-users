# Paquetes utilizados

> [!WARNING]
> Se puede actualizar el paquete privado `@juandavid9909/jobber-shared` debido a mejoras y soluciones de bugs.

```bash
npm install @elastic/elasticsearch @juandavid9909/jobber-shared@1.2.7 amqplib bcryptjs compression cors dotenv express express-async-errors helmet hpp http-status-codes joi jsonwebtoken typescript typescript-transform-paths winston pino-pretty cloudinary mongoose

npm i -D @jest/types @types/amqplib @types/bcryptjs @types/compression @types/cors @types/express @types/hpp @types/jest @types/jsonwebtoken @types/lodash @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-import jest prettier ts-jest ts-node ts-alias tsconfig-paths

npm i -g elasticdump

elasticdump --input=./gigs.json --output=http://username:password@localhost:9200/gigs --type=data
```
