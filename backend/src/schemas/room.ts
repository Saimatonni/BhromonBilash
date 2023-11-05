export interface Room{
    number : string,
    cost() : number,
}

export class ThreeStarSingleBedRoom implements Room{
    number : string

    constructor(number : string){
        this.number = number
    }

    cost() : number {
        return 10
    }
}

export class ThreeStarDoubleBedRoom implements Room{
    number : string

    constructor(number : string){
        this.number = number
    }

    cost() : number {
        return 20
    }
}

export class FourStarSingleBedRoom implements Room{
    number : string

    constructor(number : string){
        this.number = number
    }

    cost() : number {
        return 15
    }
}

export class FourStarDoubleBedRoom implements Room{
    number : string

    constructor(number : string){
        this.number = number
    }

    cost() : number {
        return 30
    }
}

export class FiveStarSingleBedRoom implements Room{
    number : string

    constructor(number : string){
        this.number = number
    }

    cost() : number {
        return 20
    }
}

export class FiveStarDoubleBedRoom implements Room{
    number : string

    constructor(number : string){
        this.number = number
    }

    cost() : number {
        return 40
    }
}