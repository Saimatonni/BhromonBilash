import { RequestHandler } from "express";
import tour, { ITour } from "../models/tour"
import { getSuccessResponse } from "../utils/helper";
import { createTour } from "../crud/tour";
import { Tour } from "../schemas/tour";

const budgetDetails = {
    BudgetFriendly : {
        hotelType : "3-star hotels for your budget. We provide the most budget friendly hotels here.",
        travelType : "Non-AC Bus service for your up and down trips. We provide most descent seating facility."
    },
    Standard : {
        hotelType : "4-star hotels for taking care of your budget and comfort. We are connected to the best 4-star hotels of the country.",
        travelType : "AC Bus service for your up and down trips. We provide most descent seating facility."    
    },
    Luxury : {
        hotelType : "5-star hotels for your luxury and deluxe. Those hotels will take care for your every desire.",
        travelType : "AC Bus service for your up and down trips with snacks and drinks as complementary. We take care for our every customer."
    }
}

export const getAllTours : RequestHandler =async (req,res,next) => {
    try{
        const tours = await new Tour("").getAllTours()
        return res.status(200).send(getSuccessResponse("All the tours fetched successfully",tours))
    }
    catch(error){
        next(error)
    }
}

export const getTour : RequestHandler =async (req, res, next) => {
    try{
        const {tourId} = req.query
        const tour = await new Tour(tourId as string).getTour()
        return res.status(200).send(getSuccessResponse("Tour details fetched successfully",{
            tour,budgetDetails
        }))
    }
    catch(error){
        next(error)
    }
    
}


//admin side methods, not for project demonstration
export const makeTour : RequestHandler= async (req, res, next)=>{
    try{
        const tour : ITour = req.body
        const result = await createTour(tour)
        return res.status(200).send(getSuccessResponse("New tour posted",result))
    }
    catch(error){
        next(error)
    }
}