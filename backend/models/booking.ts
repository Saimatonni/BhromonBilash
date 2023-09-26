import { Hotel } from "./hotel";
import { Room } from "./room";
import { HighCostTourFactory, LowCostTourFactory, MidCostTourFactory, TourFactory } from "./tourFactory";
import { Travel } from "./travel";

export abstract class ParentBooking{
    startDate : string
    endDate : string

    abstract prepareTour(hotelName : string,location : string,ratings : number,rooms : Room[],source : string,destination :string,
        upTripDate : string,upTripTime : string,downTripDate : string,downTripTIme : string,
        distance : number,bookedSeats : number) : void;

    abstract bookTour(rooms : Room[]) : void
    abstract cost() : number;
}

export class Booking extends ParentBooking{
    hotel : Hotel
    upTrip : Travel
    downTrip : Travel
    factory : TourFactory|null
    
    constructor(type :string,startDate : string, endDate : string){
        super()
        this.factory = new TypeFactory().getFactory(type)
        this.startDate = startDate
        this.endDate = endDate
    }

    bookTour(rooms : Room[]): void {
        rooms.forEach(obj=>this.hotel.bookRoom(obj))
    }

    prepareTour(hotelName : string,location : string,ratings : number,rooms : Room[],source : string,destination :string,
        upTripDate : string,upTripTime : string,downTripDate : string,downTripTIme : string,
        distance : number,bookedSeats : number): void{
        if(this.factory===null){
            console.log("Error")
            return
        }

        this.hotel = this.factory.createHotel(hotelName,location,ratings,rooms,this.startDate,this.endDate)
        this.upTrip = this.factory.createTravel(source,destination,upTripDate,upTripTime,distance,bookedSeats)
        this.downTrip = this.factory.createTravel(destination,source,downTripDate,downTripTIme,distance,bookedSeats)
    }



    cost() : number {
        console.log(`hotel cost is ${this.hotel.cost()}`)
        console.log(`Up trip cost is ${this.upTrip.cost()}`)
        console.log(`Down trip cost is ${this.downTrip.cost()}`)

        return this.hotel.cost() + this.upTrip.cost() + this.downTrip.cost()
    }
}

class TypeFactory{
    getFactory(type : string) : TourFactory|null{
        if(type==="LOW_BUDGET"){
            return new LowCostTourFactory()
        }
        else if(type==="MID_BUDGET"){
            return new MidCostTourFactory()
        }
        else if(type==="HIGH_BUDGET"){
            return new HighCostTourFactory()
        }
        else{
            console.log("Please enter valid type")
            return null
        }
    }
}

