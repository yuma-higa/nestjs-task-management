import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {Auth, AuthSchema} from './auth.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }])],
  providers: [AuthService],
      controllers: [AuthController]
})
export class AuthModule {}
