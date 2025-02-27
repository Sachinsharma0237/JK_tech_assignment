import {
  Controller,
  Post,
  Param,
  Get,
  Patch,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { Ingestion, IngestionStatus } from './entities/ingestion.entity';

@Controller('ingestion')
export class IngestionController {
  constructor(private ingestionService: IngestionService) {}

  @Post('trigger/:documentId')
  async triggerIngestion(@Param('documentId') documentId: string) {
    try {
      return await this.ingestionService.triggerIngestion(documentId);
    } catch (error) {
      throw new HttpException(
        'Failed to trigger ingestion process',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Start ingestion process
  @Post('/start/:documentId')
  async startIngestion(
    @Param('documentId') documentId: string,
  ): Promise<Ingestion> {
    return this.ingestionService.startIngestion(documentId);
  }

  // Update ingestion status
  @Patch('/status/:id')
  async updateIngestionStatus(
    @Param('id') id: number,
    @Body('status') status: IngestionStatus,
  ): Promise<Ingestion | null> {
    return this.ingestionService.updateIngestionStatus(id, status);
  }

  // Get ingestion status by ID
  @Get('/status/:id')
  async getIngestionStatus(@Param('id') id: number): Promise<Ingestion | null> {
    return this.ingestionService.getIngestionStatus(id);
  }

  // Get all ingestions
  @Get('/all')
  async getAllIngestions(): Promise<Ingestion[]> {
    return this.ingestionService.getAllIngestions();
  }
}
