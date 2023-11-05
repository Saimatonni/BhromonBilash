import { RequestHandler } from "express";
import { getSuccessResponse } from "../utils/helper";
import { createACTravels, createNonACTravels, createSpecialACTravel } from "../crud/travel";

export const makeNonACTravel : RequestHandler = async (req,res,next) => {
    try{
        const travel = req.body
        const newTravel = await createNonACTravels(travel)
        return res.status(200).send(getSuccessResponse("Non AC travel posted successfully",newTravel))
    }
    catch(error){
        next(error)
    }
}

export const makeACTravel : RequestHandler = async (req,res,next) => {
    try{
        const travel = req.body
        const newTravel = await createACTravels(travel)
        return res.status(200).send(getSuccessResponse("AC travel posted successfully",newTravel))
    }
    catch(error){
        next(error)
    }
}

export const makeSpecialACTravel : RequestHandler = async (req,res,next) => {
    try{
        const travel = req.body
        const newTravel = await createSpecialACTravel(travel)
        return res.status(200).send(getSuccessResponse("Special AC travel posted successfully",newTravel))
    }
    catch(error){
        next(error)
    }
}