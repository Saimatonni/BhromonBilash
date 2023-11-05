import { deleteBooking, getBookingsForUser } from "../crud/booking"
import { ObjectId } from "mongoose"

export interface ICommand{
    execute()
}

export interface ITrip{
    source : string,
    time : string,
    totalPrice : number,
    totalPersons : number
    travelId : ObjectId
    date : Date
}

export class Invoker{
    command  : ICommand
    constructor(command : ICommand){
        this.command = command
    }
    async execute(){
        return await this.command.execute()
    }
}

export class GetBookingsCommand implements ICommand{

    userId : string

    constructor(userId : string){
        this.userId = userId
    }

    async execute() {
        return await getBookingsForUser(this.userId)    
    }
}

export class CancelBookingCommand implements ICommand{
    bookingId : string

    constructor(bookingId : string){
        this.bookingId = bookingId
    }

    async execute() {
        return await deleteBooking(this.bookingId)
    }
}
