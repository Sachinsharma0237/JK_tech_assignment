import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class IngestionService {
  @MessagePattern('start_ingestion')
  async startIngestion(data: { documentId: string }) {
    console.log('Ingestion process started for:', data.documentId);
    return { status: 'success', message: 'Ingestion started' };
  }
}
