"use strict";
/**
 * Created by medieninf on 03.07.17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Position_1 = require("../models/Position");
exports.BillSchema = new mongoose_1.Schema({
    image: Number,
    positions: [Position_1.PositionSchema]
});
exports.Bill = mongoose_1.model("Bill", exports.BillSchema);
