import { RequestHandler } from "express";
import { Tour } from "../schemas/tour";
import { createDiscountFiveStarHotel, createDiscountFourStarHotel, createDiscountThreeStarHotel, createFiveStarHotel, createFourStarHotel, createThreeStarHotel } from "../crud/hotel";
import { getSuccessResponse } from "../utils/helper";
import APIError from "../utils/APIError";
import { EBudgetType } from "../models/booking";
import { ICommand, Invoker } from "../schemas/command";
import { Hotel } from "../schemas/hotel";


export const getHotels : RequestHandler =async (req,res,next) => {
    try{
        const {budgetType,tourId} = req.query
        const tour = new Tour(tourId as string)
        tour.setFactory(budgetType as string)
        const {hotels,travels} = await tour.prepareTour()
        return res.status(200).send(getSuccessResponse("Hotels fetched successfully",{
            hotels,travels
        }))

    }
    catch(error){
        next(error)
    }
}

export const getHotelById  :RequestHandler =async (req,res,next) => {
    try{
        const {hotelId,budgetType} = req.query
        const command : ICommand = new Hotel(hotelId as string).getHotelByIdCommand(budgetType as string)
        const invoker = new Invoker(command)
        const result = await invoker.execute()
        return res.status(200).send(getSuccessResponse("Hotel details fetched successfully",result))
    }
    catch(error){
        next(error)
    }
} 


//admin side methods
export const makeThreeStarHotel : RequestHandler =async (req,res,next) => {
    try{
        const hotel = req.body
        console.log(hotel)
        const newHotel = await createThreeStarHotel(hotel)
        return res.status(200).send(getSuccessResponse("Three Star Hotel created successfully",newHotel))
    }
    catch(error){
        next(error)
    }
}

export const makeFourStarHotel : RequestHandler =async (req,res,next) => {
    try{
        const hotel = req.body
        const newHotel = await createFourStarHotel(hotel)
        return res.status(200).send(getSuccessResponse("Four Star Hotel created successfully",newHotel))
    }
    catch(error){
        next(error)
    }
}

export const makeFiveStarHotel : RequestHandler =async (req,res,next) => {
    try{
        const hotel = req.body
        const newHotel = await createFiveStarHotel(hotel)
        return res.status(200).send(getSuccessResponse("Five Star Hotel created successfully",newHotel))
    }
    catch(error){
        next(error)
    }
}

export const pushDiscount : RequestHandler =async (req,res,next) => {
    try{
        const {hotelId,to,type,amount} = req.body
        const budgetType = req.query.budgetType
        let result :  any;
        if(budgetType===EBudgetType.LOW){
            result = await createDiscountThreeStarHotel(hotelId,{to,type,amount})
        }
        else if(budgetType===EBudgetType.MID){
            result = await createDiscountFourStarHotel(hotelId,{to,type,amount})
        }
        else if(budgetType===EBudgetType){
            result = await createDiscountFiveStarHotel(hotelId,{to,type,amount})
        }
        else{
            throw new APIError({
                status : 500,
                message : "Opps... incorrect query param."
            })
        }
        return res.status(200).send(getSuccessResponse("Discount added successfully",result))
    }
    catch(error){
        next(error)
    }
}
