import { RequestHandler } from "express";
import { ICommand, Invoker } from "../schemas/command";
import { getSuccessResponse } from "../utils/helper";
import { Rating } from "../schemas/rating";
import { ITourRating } from "../models/tourRating";
import { IHotelRating } from "../models/hotelRating";

export const postTourRatings : RequestHandler =async (req : any,res,next) => {
    try{
        const tourRating : ITourRating = req.body
        tourRating.userId = req.user._id
        const command : ICommand = new Rating(tourRating).getTourRatingCommand()
        const invoker = new Invoker(command)
        const result = await invoker.execute()
        return res.status(200).send(getSuccessResponse("Tour Rating posted successfully",result))
    }
    catch(error){
        next(error)
    }
}

export const postHotelRatings : RequestHandler =async (req : any,res,next) => {
    try{
        const hotelRating : IHotelRating = req.body
        hotelRating.userId = req.user._id
        const {budgetType} = req.query
        const command : ICommand = new Rating(hotelRating).getHotelRatingCommand(budgetType as string)
        const invoker = new Invoker(command)
        const result = await invoker.execute()
        return res.status(200).send(getSuccessResponse("Hotel Rating posted successfully",result))
    }
    catch(error){
        next(error)
    }
} 