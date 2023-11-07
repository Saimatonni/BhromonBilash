import { RequestHandler } from "express";
import { ICommand, Invoker } from "../schemas/command";
import { ChangePasswordCommand, ChangeProfileCommand, ProfileDetailsCommand } from "../schemas/profileCommand";
import { getSuccessResponse } from "../utils/helper";

export const getProfileDetils :RequestHandler =async (req : any,res,next) => {
    try{
        const userId = req.user._id
        const command : ICommand = new ProfileDetailsCommand(userId)
        const invoker = new Invoker(command)
        const result = await invoker.execute()
        return res.status(200).send(getSuccessResponse("User details fetched successfully",result))
    }
    catch(error)
    {
        next(error)
    }
}

export const changeProfile : RequestHandler =async (req : any,res,next) => {
    try{
        const userId = req.user._id
        const userDetails = req.body
        userDetails.userId = userId
        const command : ICommand = new ChangeProfileCommand(userDetails)
        const invoker =  new Invoker(command)
        const result = await invoker.execute()
        return res.status(200).send(getSuccessResponse("Your profile has been changed successfully",result))
    }
    catch(error){
        next(error)
    }
}

export const changePassword :RequestHandler =async (req : any,res,next) => {
    try{
        const userId = req.user._id
        const {previousPassword, newPassword} = req.body
        const command : ICommand = new ChangePasswordCommand(userId,previousPassword,newPassword)
        const invoker = new Invoker(command)
        await invoker.execute()
        return res.status(200).send(getSuccessResponse("Your password has been changed successfully."))
    }
    catch(error)
    {
        next(error)
    }
}