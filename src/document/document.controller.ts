import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(@UploadedFile() file: Multer.File) {
    return this.documentService.uploadDocument(file);
  }

  @Get()
  async getDocuments() {
    return this.documentService.getDocuments();
  }

  @Get(':id')
  async getDocumentById(@Param('id') id: number) {
    return this.documentService.getDocumentById(id);
  }

  @Get('download/:id')
  async downloadDocument(@Param('id') id: number, @Res() res: Response) {
    const document = await this.documentService.getDocumentById(id);
    if (!document) return res.status(404).json({ message: 'File not found' });

    return res.download(join(__dirname, '../../uploads', document.filename));
  }

  @Delete(':id')
  async deleteDocument(@Param('id') id: number) {
    return this.documentService.deleteDocument(id);
  }
}
