import { IHotelRating } from "../models/hotelRating";
import { createFiveStarHotelRating, createFourStarHotelRating, createThreeStarHotelRating, createTourRating } from "../crud/rating";
import { ITourRating } from "../models/tourRating";
import { ICommand } from "./command";
import { findUserById } from "../crud/user";
import APIError from "../utils/APIError";

abstract class RatingCommand implements ICommand{
    rating : ITourRating|IHotelRating

    constructor(rating : ITourRating|IHotelRating){
        this.rating = rating
    }

    abstract execute();

    async setUserDetails(){
        const user = await findUserById(this.rating.userId)
        if(!user)
        {
            throw new APIError({
                status : 400,
                message : "Opps... user not found."
            })
        }
        this.rating.userName = user.name
        this.rating.userImage = user.image
    }
}

export class TourRatingCommand extends RatingCommand{

    constructor(tourRating : ITourRating){
        super(tourRating)
    }

    async execute(){
        await this.setUserDetails()
        return await createTourRating(this.rating as ITourRating)
    }
}

export class ThreeStarHotelRatingCommand extends RatingCommand{

    constructor(hotelRating : IHotelRating){
        super(hotelRating)
    }

    async execute() {
        await this.setUserDetails()
        return await createThreeStarHotelRating(this.rating as IHotelRating)
    }
}

export class FourStarHotelRatingCommand extends RatingCommand{

    constructor(hotelRating : IHotelRating){
        super(hotelRating)
    }

    async execute() {
        await this.setUserDetails()
        return await createFourStarHotelRating(this.rating as IHotelRating)
    }
}

export class FiveStarHotelRatingCommand extends RatingCommand{

    constructor(hotelRating : IHotelRating){
        super(hotelRating)
    }

    async execute() {
        await this.setUserDetails()
        return await createFiveStarHotelRating(this.rating as IHotelRating)   
    }
}