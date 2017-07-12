"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by nkrei001 on 03.07.17.
 */
const mongoose_1 = require("mongoose");
const BookingType_1 = require("../enums/BookingType");
const Bill_1 = require("../models/Bill");
exports.BookingSchema = new mongoose_1.Schema({
    usage: String,
    biller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    forAll: Boolean,
    recipients: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }],
    bill: Bill_1.BillSchema,
    type: { type: BookingType_1.EBookingType },
    amount: Number,
    date: Date,
    active: Boolean
});
exports.Booking = mongoose_1.model("Booking", exports.BookingSchema);
