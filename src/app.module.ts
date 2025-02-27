import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DocumentModule } from './document/document.module';
import { MulterModule } from '@nestjs/platform-express';
import { IngestionModule } from './ingestion/ingestion.module';
dotenv.config({ path: `${__dirname}/../.env` });

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INGESTION_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 4001 },
      },
    ]),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_TIME },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true, // Auto-create tables
    }),
    MulterModule.register({
      dest: './uploads', // Store files locally
    }),
    AuthModule,
    UsersModule,
    DocumentModule,
    IngestionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Global Role Guard
    },
  ],
})
export class AppModule {}
