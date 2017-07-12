"use strict";
/**
 * Created by nkrei001 on 01.07.17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Group_1 = require("../models/Group");
const BookingType_1 = require("../enums/BookingType");
class FinanceController {
    static getSaldoByGroup(groupId) {
        //FIXME err returns total!?
        return new Promise((reject, resolve) => {
            Group_1.Group.findById(groupId).then((group) => {
                let total = 0;
                let bookings = group.bookings;
                for (let b of bookings) {
                    if (b.type === BookingType_1.EBookingType.BILL) {
                        total -= b.amount;
                    }
                    else if (b.type === BookingType_1.EBookingType.DEPOSIT) {
                        total += b.amount;
                    }
                }
                resolve(total);
            }).catch(err => reject(err));
        });
    }
    static getSaldoByUser(groupId, userId) {
        return new Promise((reject, resolve) => {
            Group_1.Group.findById(groupId).then((group) => {
                let total = 0;
                let bookings = group.bookings;
                let mem = group.member.length;
                for (let b of bookings) {
                    if (b.type === BookingType_1.EBookingType.BILL && b.biller !== userId) {
                        if (b.forAll) {
                            total -= (b.amount / mem);
                        }
                        else {
                            let rec = b.recipients.length;
                            if (b.recipients.find(userId)) {
                                total -= (b.amount / rec);
                            }
                        }
                    }
                    else if (b.type === BookingType_1.EBookingType.DEPOSIT) {
                        total += b.amount;
                    }
                }
                resolve(total);
            }).catch(err => reject(err));
        });
    }
}
exports.FinanceController = FinanceController;
exports.default = new FinanceController();
