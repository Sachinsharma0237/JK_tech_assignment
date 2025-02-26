import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { Multer } from 'multer';
import { join } from 'path';
import { writeFile, unlink, mkdir } from 'fs/promises';

@Injectable()
export class DocumentService {
  private uploadDir = join(__dirname, '../../uploads');

  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async uploadDocument(file: Multer.File) {
    const filename = `${Date.now()}-${file.originalname}`;
    const filepath = join(this.uploadDir, filename);

    try {
      // Ensure uploads directory exists
      await mkdir(this.uploadDir, { recursive: true });

      // Save file to disk
      await writeFile(filepath, file.buffer);

      // Save document metadata in the database
      const document = this.documentRepository.create({
        filename,
        filepath,
        mimetype: file.mimetype,
      });

      return await this.documentRepository.save(document);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('File upload failed');
    }
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

    try {
      await unlink(document.filepath); // Delete file from disk
    } catch (error) {
      console.error(`Error deleting file ${document.filepath}:`, error);
    }

    return this.documentRepository.remove(document);
  }
}
