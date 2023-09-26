import { Booking, ParentBooking } from "./booking";
import { calculateDaysBetweenDates } from "./hotel";
import { Room } from "./room";

export abstract class Decorator extends ParentBooking{
    abstract cost() : number
    prepareTour(hotelName: string, location: string, ratings: number, rooms: Room[], source: string, destination: string, upTripDate: string, upTripTime: string, downTripDate: string, downTripTIme: string, distance: number, bookedSeats: number): void {
        return 
    }

    bookTour(rooms: Room[]): void {
        
    }
}

export class TourGuide extends Decorator{
    parentBooking: ParentBooking;

    constructor(parentBooking : ParentBooking){
        super()
        this.parentBooking = parentBooking
    }

    cost() : number{
        let numberOfDays =  calculateDaysBetweenDates(this.parentBooking.startDate,this.parentBooking.endDate)
        if(numberOfDays!=-1){
            return this.parentBooking.cost() + numberOfDays*70
        }
        else{
            console.log("error")
            return -1
        }
    }
}

