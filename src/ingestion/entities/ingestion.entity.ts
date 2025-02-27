import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum IngestionStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Entity()
export class Ingestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documentId: string;

  @Column({ type: 'enum', enum: IngestionStatus, default: IngestionStatus.IN_PROGRESS })
  status: IngestionStatus;

  @CreateDateColumn()
  createdAt: Date;
}
