import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // Auto-create tables
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
