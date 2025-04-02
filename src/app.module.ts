import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import {MongooseModule} from '@nestjs/mongoose';
import *as dotenv from 'dotenv';

dotenv.config()
const url:string =process.env.MONGO_URL;
@Module({
  imports: [
    MongooseModule.forRoot(url),
    TasksModule, 
    AuthModule],
})
export class AppModule {}
