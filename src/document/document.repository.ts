import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DocumentRepository extends Repository<Document> {
  constructor(@InjectRepository(Document) repository: Repository<Document>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
