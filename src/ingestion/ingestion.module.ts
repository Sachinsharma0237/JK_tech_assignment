import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IngestionController } from './ingestion.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INGESTION_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 4001 }, // Microservice address
      },
    ]),
  ],
  controllers: [IngestionController],
  exports: [ClientsModule],
})
export class IngestionModule {}
