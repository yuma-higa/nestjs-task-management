import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Types} from 'mongoose';
import *as bcrypt from 'bcrypt';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth{
    @Prop({type:Types.ObjectId, default: Types.ObjectId, required:true})
    _id: Types.ObjectId

    @Prop({required: true})
    name:string

    @Prop({required: true})
    password:string
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

AuthSchema.pre<AuthDocument>('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = bcrypt.hash(this.password,salt);
        return next();
    }catch(err){
        return next(err);
    }
})