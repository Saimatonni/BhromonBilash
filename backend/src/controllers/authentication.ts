import { RequestHandler } from "express";
import { CheckEmailAndSendOtpCommand, ForgetPasswordCommand, LoginCommand, RegisterCommand, verificationCodeCommand } from "../schemas/authenticationCommand";
import { ICommand, Invoker } from "../schemas/command";
import { getSuccessResponse } from "../utils/helper";

export const login : RequestHandler =async (req,res,next) => {
    try{
        const {email,password} = req.body
        const command : ICommand = new LoginCommand(email,password)
        const invoker = new Invoker(command) 
        const result = await invoker.execute()
        return res.header("accessToken",result.jwtAccessToken).status(200).send(getSuccessResponse("User logged in successfully",{
            image : result.user.image,
            name : result.user.name,
            subscribed : result.user.subscribed
        }))
    }
    catch(error){
        next(error)
    }
}

export const register :  RequestHandler =async (req,res,next) => {
    try{
        const {email,password,name,address,phone} = req.body
        const command : ICommand = new RegisterCommand(name,address,email,password,phone)
        const invoker = new Invoker(command)
        const result = await invoker.execute()
        return res.status(200).send(getSuccessResponse("Your account has been created. Please verify your email to continue."))
    }
    catch(error){
        next(error)
    }
}

export const emailVerification : RequestHandler = async (req,res,next) => {
    try{
        const {email,token} = req.body
        const command : ICommand = new verificationCodeCommand(email,token)
        const invoker = new Invoker(command)
        const result = await invoker.execute()
        return res.header("accessToken",result.jwtAccessToken).send(getSuccessResponse("Email verified successfully",{
            image : result.user.image,
            name : result.user.name,
            subscribed : result.user.subscribed
        }))
    }
    catch(error){
        next(error)
    }
}

export const checkEmailAndSendOtp : RequestHandler = async (req,res,next) => {
    try{
        const {email} = req.body
        const command : ICommand = new CheckEmailAndSendOtpCommand(email)
        const invoker = new Invoker(command)
        await invoker.execute()
        return res.status(200).send(getSuccessResponse("Otp sent to mail for forget password."))
    }
    catch(error){
        next(error)
    }
}

export const forgetPassword : RequestHandler = async (req,res,next) => {
    try{
        const {email,token,password} = req.body
        const command :ICommand = new ForgetPasswordCommand(email,token,password)
        const invoker = new Invoker(command)
        await invoker.execute()
        return res.status(200).send(getSuccessResponse("Your password has been updated successfully. Please login with your new password"))       
    }
    catch(error){
        next(error)
    }
}