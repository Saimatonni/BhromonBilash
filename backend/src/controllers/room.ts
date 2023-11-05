import { createDoubleBedFiveStar, createDoubleBedFourStar, createDoubleBedThreeStar, createSingleBedFiveStar, createSingleBedFourStar, createSingleBedThreeStar } from "../crud/room";
import { RequestHandler } from "express";
import { getSuccessResponse } from "../utils/helper";


//admin side room creation
export const makeSingleBedThreeStar : RequestHandler =async (req,res,next) => {
    try{
        const room = req.body
        const newRoom = await createSingleBedThreeStar(room)
        return res.status(200).send(getSuccessResponse("Three star single bed room created",newRoom))
    }
    catch(error){
        next(error)
    }
}

export const makeSingleBedFourStar : RequestHandler =async (req,res,next) => {
    try{
        const room = req.body
        const newRoom = await createSingleBedFourStar(room)
        return res.status(200).send(getSuccessResponse("Four star single bed room created",newRoom))
    }
    catch(error){
        next(error)
    }
} 

export const makeSingleBedFiveStar : RequestHandler =async (req,res,next) => {
    try{
        const room = req.body
        const newRoom = await createSingleBedFiveStar(room)
        return res.status(200).send(getSuccessResponse("Five star single bed room created",newRoom))
    }
    catch(error){
        next(error)
    }
}

export const makeDoubleBedThreeStar : RequestHandler =async (req,res,next) => {
    try{
        const room = req.body
        const newRoom = await createDoubleBedThreeStar(room)
        return res.status(200).send(getSuccessResponse("Three star double bed room created",newRoom))
    }
    catch(error){
        next(error)
    }
}

export const makeDoubleBedFourStar : RequestHandler =async (req,res,next) => {
    try{
        const room = req.body
        const newRoom = await createDoubleBedFourStar(room)
        return res.status(200).send(getSuccessResponse("Four star double bed room created",newRoom))
    }
    catch(error){
        next(error)
    }
}

export const makeDoubleBedFiveStar : RequestHandler =async (req,res,next) => {
    try{
        const room = req.body
        const newRoom = await createDoubleBedFiveStar(room)
        return res.status(200).send(getSuccessResponse("Five star double bed room created",newRoom))
    }
    catch(error){
        next(error)
    }
}