/**
 * Created by nkrei001 on 03.07.17.
 */
import {IUser} from "../interfaces/User";
import { Document, Schema, Model, model} from "mongoose";
export interface IUserModel extends IUser, Document {
    //timeInterval(): string
}

export const UserSchema: Schema = new Schema({
    firstName : String,
    lastName: String,
    email: String,
    externalId: Number
});

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);