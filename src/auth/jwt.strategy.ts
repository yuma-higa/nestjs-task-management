import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt,Strategy} from 'passport-jwt';
import {JwtPayload} from './jwt-payload.interface';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './auth.schema';
import { InjectModel } from '@nestjs/mongoose';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel('Auth') private authModel:Model<AuthDocument> ,
    ){
      super({
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      })
    }
    async validate(payload:JwtPayload) :Promise<Auth>{
        const {name} =payload;
        const user:Auth = await this.authModel.findOne({name});
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}