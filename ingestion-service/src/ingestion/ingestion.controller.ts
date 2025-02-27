import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class IngestionController {
  @MessagePattern('start_ingestion')
  handleIngestion(@Payload() data: { documentId: string }) {
    console.log(`Processing ingestion for document: ${data.documentId}`);
    return { success: true, message: `Ingestion started for ${data.documentId}` };
  }
}
