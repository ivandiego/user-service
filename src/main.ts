// import { NestFactory } from '@nestjs/core';
// import { Transport, MicroserviceOptions } from '@nestjs/microservices';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
//     transport: Transport.KAFKA,
//     options: {
//       client: {
//         brokers: ['kafka:9092'],
//       },
//       consumer: {
//         groupId: 'user-service',
//       },
//     },
//   });

//   await app.listen();
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // Inicializa o HTTP server para os endpoints REST
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilita CORS caso precise de requisições externas
  await app.listen(3002); // Porta 3002 (para corresponder ao Docker)

  console.log('User Service rodando em http://localhost:3002');

  // Inicializa o microserviço Kafka
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'user-service',
      },
    },
  });

  await microservice.listen();
  console.log('User Service conectado ao Kafka');
}

bootstrap();
