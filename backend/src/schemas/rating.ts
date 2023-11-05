import { ITourRating } from "models/tourRating";
import { FactoryMethod } from "./factoryMethod";
import { TourRatingCommand } from "./ratingCommand";
import { IHotelRating } from "models/hotelRating";

export class Rating{
    factoryMethod :  FactoryMethod
    rating : IHotelRating|ITourRating

    constructor(rating : IHotelRating|ITourRating){
        this.factoryMethod = new FactoryMethod()
        this.rating = rating
    }

    getTourRatingCommand(){
        return new TourRatingCommand(this.rating as ITourRating)
    }

    getHotelRatingCommand(budgetType : string){
        return this.factoryMethod.hotelRatingFactoryMethod(budgetType,this.rating as IHotelRating)
    }
}