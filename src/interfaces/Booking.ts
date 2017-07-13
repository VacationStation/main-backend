/**
 * Created by christiankalig on 02.07.17.
 */

import {IUser} from './User';
import {IBill} from './Bill';

import {EBookingType} from '../enums/BookingType';

export interface IBooking {
    readonly usage?: string,
    biller: IUser,
    readonly forAll?: boolean,
    readonly recipients?: Array<IUser>,
    readonly bill?: IBill,
    readonly type: EBookingType
    readonly amount?: number, // in cents
    readonly date: Date,
    active: boolean
}