/**
 * Created by nkrei001 on 01.07.17.
 */

import {Group, IGroupModel} from '../models/Group';
import {Bill, IBillModel} from '../models/Bill';
import {Booking, IBookingModel} from '../models/Booking';
import {EBookingType} from "../enums/BookingType";
import {IPositionModel, Position} from "../models/Position";
import * as shortid from 'shortid';
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');


export class GroupController {

    public static findGroupById(id) : Promise<IGroupModel>  {
        return new Promise<IGroupModel>((resolve, reject) => {
            Group.findById(id)
                .populate('member')
                .populate('owner')
                .exec()
                .then((group: IGroupModel) => {
                    group.bookings.forEach(function(key, value) {
                    })
                })
                .catch(err => reject(err));
        });
    }

    public static findGroupsWithUserId(id) : Promise<Array<IGroupModel>> {
        console.log("findGroupsWithUserId" ,id);
        return new Promise<Array<IGroupModel>>((resolve, reject) => {
            Group.find({member: id})
                .populate('owner')
                .populate('member')
                .exec()
                .then((groups: Array<IGroupModel>) => resolve(groups))
                .catch(err => reject(err));
        });
    }

    public static saveGroup(data, user) : Promise<any> {
        const group = new Group(data);
        group.owner = user._id;
        group.member.push(user._id);
        return group.save();
    }

    public static getInvite(id) : Promise<any> {

        return new Promise<any>((resolve, reject) => {
            Group.findById(id)
                .then((group: IGroupModel) => {
                    let code = shortid.generate();
                    group.invite.push(code);
                    group.save();
                    resolve(code);
                })
                .catch(err => reject(err));
        });
    }

    public static addUser(user, key) : Promise<any> {
        console.log("addUser", key);
        return new Promise<any>((resolve, reject) => {
            Group.findOne({invite: key}, function (err, group){
                if(err)reject(err);
                if(!group) reject("Key invalid");
                console.log("addUser", user, key, group);
                group.member.push(user._id);
                let invite = group.invite;
                for(let i = 0; i < invite.length; i++){
                    if(invite[i] === key) {
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



    public static removeUser(groupId, userId, ownerId) : Promise<any> {

        return new Promise<any>((resolve, reject) => {
            Group.findById(groupId, function(err, res){
                if(err) reject(err);

                if(res.owner === ownerId){
                    Group.findByIdAndUpdate(
                        groupId,
                        {$pull: {"member" : userId}},
                        {new : true}
                    )
                        .then((group : IGroupModel) => resolve(group.member))
                        .catch(err => reject(err));
                }else{
                    reject("Permission");
                }
            });
        });
    }

    public static addBill(groupId, data, user) : Promise<any> {
        let bill = data.bill;


        let bookingData = data;
        bookingData.active = true;
        bookingData.date = Date.now();
        bookingData.type = EBookingType.BILL;
        bookingData.bill = bill;
        bookingData.biller = user._id;

        //calc amount
        let sum = 0;
        for( let pos of bill.positions){
            sum += (pos.price * pos.quantity);
        }
        bookingData.amount = sum;

        return new Promise<any>((resolve, reject) => {
            const booking = new Booking(bookingData);
            Group.findById(groupId, function(err, group) {
                if(err) reject(err);
                group.bookings.push(booking);
                group.save().then(group => {
                    resolve(group);
                }).catch(err => {
                    reject(err);
                });
            });
        });
    }

    public static addDeposit(groupId, data) : Promise<any> {
        let bookingData = data;
        bookingData.date = Date.now();
        bookingData.active = true;
        bookingData.type = EBookingType.DEPOSIT;
        return new Promise<any>(( resolve, reject) => {
            const booking = new Booking(bookingData);
            Group.findById(groupId, function(err, group) {
                if(err) reject(err);
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

export default new GroupController();
