import { Room } from "./room"

export function calculateDaysBetweenDates(dateString1: string, dateString2: string): number{
    // Parse the date strings into Date objects
    const dateParts1 = dateString1.split('/').map(Number);
    const dateParts2 = dateString2.split('/').map(Number);
  
    // Check if the date strings are valid
    if (
      dateParts1.length !== 3 ||
      dateParts2.length !== 3 ||
      isNaN(dateParts1[0]) ||
      isNaN(dateParts1[1]) ||
      isNaN(dateParts1[2]) ||
      isNaN(dateParts2[0]) ||
      isNaN(dateParts2[1]) ||
      isNaN(dateParts2[2])
    ) {
      return -1; // Invalid date format
    }
  
    const date1 = new Date(dateParts1[2], dateParts1[1] - 1, dateParts1[0]); // Month is zero-based
    const date2 = new Date(dateParts2[2], dateParts2[1] - 1, dateParts2[0]);
  
    // Calculate the time difference in milliseconds
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  
    // Convert milliseconds to days
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
    return daysDiff + 1;
  }
  


export interface Hotel{
    name : string,
    location : string,
    ratings : number,
    rooms : Room[],
    currentBookingRooms : Room[],
    serviceCharge : number,
    startDate : string,
    endDate : string,
    cost() : number,
    bookRoom(room : Room) : void
}

export class ThreeStarHotel implements Hotel{
    name : string
    location : string
    ratings : number
    rooms : Room[]
    currentBookingRooms: Room[] = []
    serviceCharge: number
    startDate : string
    endDate : string

    constructor(name : string,location : string,ratings : number,rooms : Room[],startDate : string,endDate : string){
        this.name = name
        this.location = location
        this.ratings = ratings
        this.rooms = rooms
        this.serviceCharge = 50
        this.startDate = startDate
        this.endDate = endDate
    }

    cost() : number{
        let numberOfDays = calculateDaysBetweenDates(this.startDate,this.endDate)
        let roomCost : number
        if(numberOfDays!=-1){
            roomCost = this.currentBookingRooms.reduce((accumulator,currentValue)=>{
                return accumulator + (numberOfDays)*currentValue.cost()},0)
            return this.serviceCharge + roomCost
        }
        return -1
    }

    bookRoom(room : Room): void {
        // let temp = this.rooms.filter(indexRoom=>indexRoom.number===room.number)
        // if(temp.length!=0){
        //     console.log("Your room is booked already...")
        //     return 
        // }
        this.currentBookingRooms.push(room)
    }
}

export class FourStarHotel implements Hotel{
    name : string
    location : string
    ratings : number
    rooms : Room[]
    currentBookingRooms: Room[] = []
    serviceCharge: number;
    startDate : string
    endDate : string


    constructor(name : string,location : string,ratings : number,rooms : Room[],startDate:string,endDate : string){
        this.name = name
        this.location = location
        this.ratings = ratings
        this.rooms = rooms
        this.serviceCharge = 100
        this.startDate = startDate
        this.endDate = endDate
    }

    
    cost() : number{
        let numberOfDays = calculateDaysBetweenDates(this.startDate,this.endDate)
        let roomCost : number
        if(numberOfDays!=-1){
            roomCost = this.currentBookingRooms.reduce((accumulator,currentValue)=>accumulator + (numberOfDays)*currentValue.cost(),0) 
            return this.serviceCharge + roomCost
        }
        return -1
    }


    bookRoom(room : Room): void {
        let temp = this.rooms.filter(indexRoom=>indexRoom.number===room.number)
        if(temp.length!=0){
            console.log("Your room is booked already...")
            return 
        }
        this.currentBookingRooms.push(room)
    }
}

export class FiveStarHotel implements Hotel{
    name : string
    location : string
    ratings : number
    rooms : Room[]
    currentBookingRooms: Room[] = []
    serviceCharge: number;
    startDate : string
    endDate : string


    constructor(name : string,location : string,ratings : number,rooms : Room[],startDate : string,endDate :string){
        this.name = name
        this.location = location
        this.ratings = ratings
        this.rooms = rooms
        this.serviceCharge = 150
        this.startDate = startDate
        this.endDate = endDate
    }
    
    cost() : number{
        let numberOfDays = calculateDaysBetweenDates(this.startDate,this.endDate)
        let roomCost : number
        if(numberOfDays!=-1){
            roomCost = this.currentBookingRooms.reduce((accumulator,currentValue)=>accumulator + (numberOfDays)*currentValue.cost(),0) 
            return this.serviceCharge + roomCost
        }
        return -1
    }

    bookRoom(room : Room): void {
        let temp = this.rooms.filter(indexRoom=>indexRoom.number===room.number)
        if(temp.length!=0){
            console.log("Your room is booked already...")
            return 
        }
        this.currentBookingRooms.push(room)
    }
}