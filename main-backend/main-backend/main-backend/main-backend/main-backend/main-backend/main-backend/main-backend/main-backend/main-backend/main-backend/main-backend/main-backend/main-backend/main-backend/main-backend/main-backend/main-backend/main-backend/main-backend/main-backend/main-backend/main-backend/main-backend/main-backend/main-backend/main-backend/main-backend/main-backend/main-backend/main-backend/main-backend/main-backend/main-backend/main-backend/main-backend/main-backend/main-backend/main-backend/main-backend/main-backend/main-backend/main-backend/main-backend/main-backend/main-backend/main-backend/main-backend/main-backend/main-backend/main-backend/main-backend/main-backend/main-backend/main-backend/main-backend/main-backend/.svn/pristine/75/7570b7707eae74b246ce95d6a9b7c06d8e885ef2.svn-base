/**
 * Created by medieninf on 03.07.17.
 */

import { Document, Schema, Model, model} from "mongoose";
import { IBill } from "../interfaces/Bill";
import { PositionSchema } from "../models/Position";

export interface IBillModel extends IBill, Document {
    //timeInterval(): string
}

export const BillSchema: Schema = new Schema({
    image: Number,
    positions: [PositionSchema]

});

export const Bill: Model<IBillModel> = model<IBillModel>("Bill", BillSchema);