"use strict";
/**
 * Created by nkrei001 on 03.07.17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PositionType_1 = require("../enums/PositionType");
exports.PositionSchema = new mongoose_1.Schema({
    name: String,
    quantity: Number,
    price: Number,
    type: { type: PositionType_1.EPositionType }
});
exports.Position = mongoose_1.model("Position", exports.PositionSchema);
