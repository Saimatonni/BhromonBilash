import { FiveStarHotel, FourStarHotel, Hotel, ThreeStarHotel } from "./hotel";
import { Room } from "./room";
import { ACBus, ACBusWithService, NonACBus, Travel } from "./travel";

export interface TourFactory{
    createHotel(name : string, location : string, ratings : number,rooms : Room[],startDate :string,endDate :string) : Hotel,
    createTravel(source : string,destination : string,date : string,time : string,distance : number,bookedSeats : number) : Travel
}

export class LowCostTourFactory implements TourFactory{
    createHotel(name : string, location : string, ratings : number,rooms : Room[],startDate :string,endDate : string): Hotel {
        return new ThreeStarHotel(name,location,ratings,rooms,startDate,endDate)
    }

    createTravel(source : string,destination : string,date : string,time : string,distance : number,bookedSeats : number): Travel {
        return new NonACBus(source,destination,date,time,distance,bookedSeats)
    }
}

export class MidCostTourFactory implements TourFactory{
    createHotel(name : string, location : string, ratings : number,rooms : Room[],startDate : string, endDate : string): Hotel {
        return new FourStarHotel(name,location,ratings,rooms,startDate,endDate)
    }

    createTravel(source : string,destination : string,date : string,time : string,distance : number,bookedSeats : number): Travel {
        return new ACBus(source,destination,date,time,distance,bookedSeats)
    }
}

export class HighCostTourFactory implements TourFactory{
    createHotel(name : string, location : string, ratings : number,rooms : Room[],startDate : string,endDate : string): Hotel {
        return new FiveStarHotel(name,location,ratings,rooms,startDate,endDate)
    }

    createTravel(source : string,destination : string,date : string,time : string,distance : number,bookedSeats : number): Travel {
        return new ACBusWithService(source,destination,date,time,distance,bookedSeats)
    }
}