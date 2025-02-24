import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
dotenv.config({ path: `${__dirname}/../.env` });

@Module({
  imports: [
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
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
