import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { IngestionModule } from './ingestion/ingestion.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(IngestionModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 4001,
    },
  });

  console.log('Ingestion Microservice is running on port 4001');
  await app.listen();
}

bootstrap();
