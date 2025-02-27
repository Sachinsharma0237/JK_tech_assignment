import { Controller, Post, Body, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('ingestion')
export class IngestionController {
  private readonly logger = new Logger(IngestionController.name);

  constructor(@Inject('INGESTION_SERVICE') private readonly client: ClientProxy) {}

  @Post('start')
  async startIngestion(@Body() data: { documentId: string }) {
    this.logger.log(`Sending request for document: ${data.documentId}`);

    try {
      const response = await lastValueFrom(this.client.send('start_ingestion', data));
      this.logger.log(`Response from ingestion service: ${JSON.stringify(response)}`);
      return response;
    } catch (error) {
      this.logger.error(`Error in ingestion: ${error.message}`, error.stack);
      throw error;
    }
  }
}
