import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
