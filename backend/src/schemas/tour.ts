import APIError from "../utils/APIError"
import { fetchTour, fetchTours } from "../crud/tour"
import { FactoryMethod } from "./factoryMethod"
import { TourFactory } from "./tourFactory"

export class Tour{
    id : string
    tourFactory : TourFactory
    factoryMethod : FactoryMethod

    constructor(id : string){
        this.id = id
        this.factoryMethod = new FactoryMethod()
    }

    async getAllTours(){
        return await fetchTours()
    }
    
    async getTour(){
        return await fetchTour(this.id)
    }

    setFactory(budgetType : string){
        this.tourFactory = this.factoryMethod.tourFactoryMethod(budgetType)
    }

    async prepareTour(){
        if(!this.tourFactory){
            throw new APIError({
                status : 500,
                message : "Tour factory has to be set first before calling other methods"
            })
        }
        const hotels = await this.tourFactory.getHotels(this.id)
        const travels = await this.tourFactory.getTravels(this.id)

        return {hotels,travels}
    }

}