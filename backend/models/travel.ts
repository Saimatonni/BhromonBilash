export interface Travel{
    source : string,
    destination : string,
    date : string,
    distance : number,
    time : string,
    bookedSeats : number,
    seatCharge : number,
    cost() : number,
}

export class NonACBus implements Travel{
    source : string
    destination : string
    date : string
    distance : number
    time : string
    bookedSeats : number
    seatCharge: number;
    
    constructor(source : string,destination : string, date : string,time : string,distance: number,bookedSeats : number){
        this.source = source
        this.destination = destination
        this.date = date
        this.time = time
        this.distance = distance
        this.bookedSeats = bookedSeats
        this.seatCharge = 500
    }

    cost() : number{
        return this.distance*this.bookedSeats*this.seatCharge
    }
}

export class ACBus implements Travel{
    source : string
    destination : string
    date : string
    distance : number
    time : string
    bookedSeats : number
    seatCharge: number;
    
    constructor(source : string,destination : string, date : string,time : string,distance: number,bookedSeats : number){
        this.source = source
        this.destination = destination
        this.date = date
        this.time = time
        this.distance = distance
        this.bookedSeats = bookedSeats
        this.seatCharge = 1000
    }

    cost() : number{
        return this.distance*this.bookedSeats*this.seatCharge
    }
}

export class ACBusWithService implements Travel{
    source : string
    destination : string
    date : string
    distance : number
    time : string
    bookedSeats : number
    seatCharge: number;
    
    constructor(source : string,destination : string, date : string,time : string,distance: number,bookedSeats : number){
        this.source = source
        this.destination = destination
        this.date = date
        this.time = time
        this.distance = distance
        this.bookedSeats = bookedSeats
        this.seatCharge = 1200
    }

    cost() : number{
        return this.distance*this.bookedSeats*this.seatCharge
    }
}