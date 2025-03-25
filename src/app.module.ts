import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import {MongooseModule} from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://deltyum:deltyum254%40@cluster0.fc7tc.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0'),
    TasksModule, 
    AuthModule],
})
export class AppModule {}
