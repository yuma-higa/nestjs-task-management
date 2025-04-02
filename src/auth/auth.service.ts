import { Injectable,ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth,AuthDocument } from './auth.schema';
import { CreateUserDto } from './dto/create-user.dto';
import *as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Auth.name) private authModel:Model<AuthDocument>,
        private jwtService: JwtService
    ){};

    async signUp(createUserDto:CreateUserDto):Promise<void>{
        const {name,password} = createUserDto;


        const existingUser = await this.authModel.findOne({ name });
        if(existingUser){
            throw new ConflictException('this username is already taken',{
                cause: new Error(),
                description:'409 this action cause confliction on existing resource'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const User = new this.authModel({
            name: name,
            password: hashedPassword
        })
        try{
            await User.save();
        }catch(error){
            console.error('Error saving user:', error);
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    async signIn(createUserDto:CreateUserDto):Promise<{accessToken:string}>{
        const {name,password} = createUserDto;
        const user = await this.authModel.findOne({name});
        if(user&& await bcrypt.compare(password,user.password)){
            const payload: JwtPayload = {name};
            const accessToken = await this.jwtService.sign(payload);
            return {accessToken};
        }else{
           
            throw new UnauthorizedException('invalid credentials, check your password and name again');
        }
        
    }

}
