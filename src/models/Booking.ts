/**
 * Created by nkrei001 on 03.07.17.
 */
import { Document, Schema, Model, model} from "mongoose";
import { IBooking } from "../interfaces/Booking";
import {EBookingType} from "../enums/BookingType";
import {UserSchema} from "../models/User";
import {BillSchema} from "../models/Bill";

export interface IBookingModel extends IBooking, Document {
    //timeInterval(): string
}

export const BookingSchema: Schema = new Schema({
    usage: String,
    biller: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    forAll: Boolean,
    recipients: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    bill: BillSchema,
    type: {type: EBookingType},
    amount: Number, // in cents
    date: Date,
    active: Boolean
});

export const Booking: Model<IBookingModel> = model<IBookingModel>("Booking", BookingSchema);