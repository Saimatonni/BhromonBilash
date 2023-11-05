import { RequestHandler } from "express";
import { ICommand, Invoker } from "../schemas/command";
import { getSuccessResponse } from "../utils/helper";
import { Rating } from "../schemas/rating";

export const postTourRatings : RequestHandler =async (req,res,next) => {
    try{
        const tourRating = req.body
        const command : ICommand = new Rating(tourRating).getTourRatingCommand()
        const invoker = new Invoker(command)
        const result = await invoker.execute()
        return res.status(200).send(getSuccessResponse("Tour Rating posted successfully",result))
    }
    catch(error){
        next(error)
    }
}

export const postHotelRatings : RequestHandler =async (req,res,next) => {
    try{
        const hotelRating = req.body
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