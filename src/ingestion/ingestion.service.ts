import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingestion, IngestionStatus } from './entities/ingestion.entity';

@Injectable()
export class IngestionService {
  private pythonBackendUrl: string;

  constructor(
    @InjectRepository(Ingestion)
    private ingestionRepository: Repository<Ingestion>,
    private readonly httpService: HttpService,
  ) {
    this.pythonBackendUrl = String(process.env.PYTHON_BACKEND_URL);
  }

  async triggerIngestion(documentId: string): Promise<any> {
    if (!this.pythonBackendUrl) {
      throw new HttpException(
        'Python backend URL is not configured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const url = `${this.pythonBackendUrl}/ingest`;
      const response = await lastValueFrom(
        this.httpService.post(url, { documentId }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error triggering ingestion process',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Start an ingestion process
  async startIngestion(documentId: string): Promise<Ingestion> {
    const ingestion = this.ingestionRepository.create({
      documentId,
      status: IngestionStatus.IN_PROGRESS,
    });
    return this.ingestionRepository.save(ingestion);
  }

  // Update ingestion status
  async updateIngestionStatus(
    id: number,
    status: IngestionStatus,
  ): Promise<Ingestion | null> {
    const ingestion = await this.ingestionRepository.findOne({ where: { id } });
    if (!ingestion) return null;

    ingestion.status = status;
    return this.ingestionRepository.save(ingestion);
  }

  // Get ingestion status by ID
  async getIngestionStatus(id: number): Promise<Ingestion | null> {
    return this.ingestionRepository.findOne({ where: { id } });
  }

  // Get all ingestions
  async getAllIngestions(): Promise<Ingestion[]> {
    return this.ingestionRepository.find();
  }
}
