"use strict";
/**
 * Created by nkrei001 on 01.07.17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Group_1 = require("../models/Group");
const Booking_1 = require("../models/Booking");
const BookingType_1 = require("../enums/BookingType");
const shortid = require("shortid");
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
class GroupController {
    static findGroupById(id) {
        return new Promise((resolve, reject) => {
            Group_1.Group.findById(id)
                .populate('member')
                .populate('owner')
                .exec()
                .then((group) => {
                group.bookings.forEach(function (key, value) {
                });
            })
                .catch(err => reject(err));
        });
    }
    static findGroupsWithUserId(id) {
        console.log("findGroupsWithUserId", id);
        return new Promise((resolve, reject) => {
            Group_1.Group.find({ member: id })
                .populate('owner')
                .populate('member')
                .exec()
                .then((groups) => resolve(groups))
                .catch(err => reject(err));
        });
    }
    static saveGroup(data, user) {
        const group = new Group_1.Group(data);
        group.owner = user._id;
        group.member.push(user._id);
        return group.save();
    }
    static getInvite(id) {
        return new Promise((resolve, reject) => {
            Group_1.Group.findById(id)
                .then((group) => {
                let code = shortid.generate();
                group.invite.push(code);
                group.save();
                resolve(code);
            })
                .catch(err => reject(err));
        });
    }
    static addUser(user, key) {
        console.log("addUser", key);
        return new Promise((resolve, reject) => {
            Group_1.Group.findOne({ invite: key }, function (err, group) {
                if (err)
                    reject(err);
                if (!group)
                    reject("Key invalid");
                console.log("addUser", user, key, group);
                group.member.push(user._id);
                let invite = group.invite;
                for (let i = 0; i < invite.length; i++) {
                    if (invite[i] === key) {
                        invite.splice(i, 1);
                        break;
                    }
                }
                group.invite = invite;
                group.save()
                    .then((group) => resolve(group.member))
                    .catch(err => reject(err));
            });
        });
    }
    static removeUser(groupId, userId, ownerId) {
        return new Promise((resolve, reject) => {
            Group_1.Group.findById(groupId, function (err, res) {
                if (err)
                    reject(err);
                if (res.owner === ownerId) {
                    Group_1.Group.findByIdAndUpdate(groupId, { $pull: { "member": userId } }, { new: true })
                        .then((group) => resolve(group.member))
                        .catch(err => reject(err));
                }
                else {
                    reject("Permission");
                }
            });
        });
    }
    static addBill(groupId, data, user) {
        let bill = data.bill;
        let bookingData = data;
        bookingData.active = true;
        bookingData.date = Date.now();
        bookingData.type = BookingType_1.EBookingType.BILL;
        bookingData.bill = bill;
        bookingData.biller = user._id;
        //calc amount
        let sum = 0;
        for (let pos of bill.positions) {
            sum += (pos.price * pos.quantity);
        }
        bookingData.amount = sum;
        return new Promise((resolve, reject) => {
            const booking = new Booking_1.Booking(bookingData);
            Group_1.Group.findById(groupId, function (err, group) {
                if (err)
                    reject(err);
                group.bookings.push(booking);
                group.save().then(group => {
                    resolve(group);
                }).catch(err => {
                    reject(err);
                });
            });
        });
    }
    static addDeposit(groupId, data) {
        let bookingData = data;
        bookingData.date = Date.now();
        bookingData.active = true;
        bookingData.type = BookingType_1.EBookingType.DEPOSIT;
        return new Promise((resolve, reject) => {
            const booking = new Booking_1.Booking(bookingData);
            Group_1.Group.findById(groupId, function (err, group) {
                if (err)
                    reject(err);
                group.bookings.push(booking);
                group.save().then(group => {
                    resolve(group);
                }).catch(err => {
                    reject(err);
                });
            });
        });
    }
}
exports.GroupController = GroupController;
exports.default = new GroupController();
