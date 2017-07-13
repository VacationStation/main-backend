/**
 * Created by nkrei001 on 01.07.17.
 */

import {Group, IGroupModel} from '../models/Group';
import {EBookingType} from '../enums/BookingType';
export class FinanceController{

    public static getSaldoByGroup(groupId) : Promise<any>{
        //FIXME err returns total!?
        return new Promise ((reject, resolve) => {
            Group.findById(groupId).then( (group : IGroupModel) => {
                let total = 0;
                let bookings= group.bookings;

                for(let b of bookings){
                    if(b.type === EBookingType.BILL){
                        total -= b.amount;
                    }else if(b.type === EBookingType.DEPOSIT){
                        total += b.amount;
                    }
                }
                resolve(total);
            }).catch(err => reject(err));
        });

    }

    public static getSaldoByUser(groupId, userId) : Promise<any> {

        return new Promise((reject, resolve) => {
            Group.findById(groupId).then( (group : IGroupModel) => {

                let total = 0;
                let bookings = group.bookings;
                let mem = group.member.length;

                for( let b of bookings){
                    if(b.type === EBookingType.BILL && b.biller !== userId){
                        if(b.forAll){
                            total -= (b.amount / mem);
                        }else{
                            let rec = b.recipients.length;
                            if(b.recipients.find(userId)){
                                total -= (b.amount / rec);
                            }
                        }

                    }else if(b.type === EBookingType.DEPOSIT){
                        total += b.amount;
                    }
                }

                resolve(total);
            }).catch(err => reject(err));
        });
    }
}

export default new FinanceController();