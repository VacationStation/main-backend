/**
 * Created by christiankalig on 02.07.17.
 */

import { Document, Schema, Model, model} from "mongoose";
import { IGroup } from "../interfaces/Group";
import {Booking, BookingSchema} from "../models/Booking"
import {UserSchema} from "../models/User";

export interface IGroupModel extends IGroup, Document {
    //timeInterval(): string
}

export const GroupSchema: Schema = new Schema({
    createdAt: Date,
    name: String,
    description: String,
    destination: String,
    dateFrom: Date,
    dateTo: Date,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    member: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    bookings: [BookingSchema],
    invite: [String]
});

export const Group: Model<IGroupModel> = model<IGroupModel>("Group", GroupSchema);