import { IBooking } from "../models/booking";
import { FactoryMethod } from "./factoryMethod";

export class Booking{
    booking : IBooking
    factoryMethod : FactoryMethod

    constructor(booking : IBooking){
        this.booking = booking
        this.factoryMethod = new FactoryMethod()
    }

    createBookingCommand(){
        return this.factoryMethod.bookingFactoryMethod(this.booking)
    }
}