import { Document } from 'mongoose';
import { Types } from 'mongoose';
export type AuthDocument = Auth & Document;
export declare class Auth {
    name: string;
    password: string;
}
export declare const AuthSchema: import("mongoose").Schema<Auth, import("mongoose").Model<Auth, any, any, any, Document<unknown, any, Auth> & Auth & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Auth, Document<unknown, {}, import("mongoose").FlatRecord<Auth>> & import("mongoose").FlatRecord<Auth> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
