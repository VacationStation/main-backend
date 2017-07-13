/**
 * Created by nkrei001 on 03.07.17.
 */

import { Document, Schema, Model, model} from "mongoose";
import { IPosition } from "../interfaces/Position";
import { EPositionType} from "../enums/PositionType";

export interface IPositionModel extends IPosition, Document {
    //timeInterval(): string
}

export const PositionSchema: Schema = new Schema({
    name: String,
    quantity: Number,
    price: Number, //in cents
    type: {type: EPositionType}

});

export const Position: Model<IPositionModel> = model<IPositionModel>("Position", PositionSchema);