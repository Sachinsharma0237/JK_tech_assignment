import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { Multer } from 'multer';
import { join } from 'path';
import { writeFile, unlink } from 'fs/promises';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async uploadDocument(file: Multer.File) {
    const filename = `${Date.now()}-${file.originalname}`;
    const filepath = join(__dirname, '../../uploads', filename);

    await writeFile(filepath, file.buffer); // Save file to disk

    const document = this.documentRepository.create({
      filename,
      filepath,
      mimetype: file.mimetype,
    });

    return await this.documentRepository.save(document);
  }

  async getDocuments() {
    return this.documentRepository.find();
  }

  async getDocumentById(id: number) {
    return this.documentRepository.findOne({ where: { id } });
  }

  async deleteDocument(id: number) {
    const document = await this.getDocumentById(id);
    if (!document) return null;

    await unlink(document.filepath); // Delete file from disk
    return this.documentRepository.remove(document);
  }
}
