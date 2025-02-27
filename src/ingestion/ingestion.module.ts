import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingestion } from './entities/ingestion.entity';
import { IngestionService } from './ingestion.service';
import { IngestionController } from './ingestion.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Ingestion]), HttpModule],
  providers: [IngestionService],
  controllers: [IngestionController],
})
export class IngestionModule {}
