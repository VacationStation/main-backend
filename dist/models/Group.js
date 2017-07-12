"use strict";
/**
 * Created by christiankalig on 02.07.17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Booking_1 = require("../models/Booking");
exports.GroupSchema = new mongoose_1.Schema({
    createdAt: Date,
    name: String,
    description: String,
    destination: String,
    dateFrom: Date,
    dateTo: Date,
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    member: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }],
    bookings: [Booking_1.BookingSchema],
    invite: [String]
});
exports.Group = mongoose_1.model("Group", exports.GroupSchema);
