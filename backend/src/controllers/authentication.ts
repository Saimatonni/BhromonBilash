import { RequestHandler } from "express";
import { ForgetPasswordCommand, LoginCommand, RegisterCommand, verificationCodeCommand } from "../schemas/authenticationCommand";
import { ICommand, Invoker } from "../schemas/command";
import { getSuccessResponse } from "../utils/helper";
import { updateEmailVerificationCode } from "../crud/user";
import randomString from "randomstring"
import bcrypt from "bcrypt"
import APIError from "../utils/APIError";
import sendEmailVerificationCode from "../services/emailService";

export const login : RequestHandler =async (req,res,next) => {
    try{
        const {email,password} = req.body
        const command : ICommand = new LoginCommand(email,password)
        const invoker = new Invoker(command) 
        const result = await invoker.execute()
        return res.header("accessToken",result.jwtAccessToken).status(200).send(getSuccessResponse("User logged in successfully",result.user))
    }
    catch(error){
        next()
    }
}

export const register :  RequestHandler =async (req,res,next) => {
    try{
        const {email,password,name,address,phone} = req.body
        const command : ICommand = new RegisterCommand(name,address,email,password,phone)
        const invoker = new Invoker(command)
        const result = await invoker.execute()
        return res.status(200).send(getSuccessResponse("Your account has been created. Please verify your email to continue.",result))
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
        return res.header("accessToken",result.jwtAccessToken).send(getSuccessResponse("Email verified successfully",result.user))
    }
    catch(error){
        next(error)
    }
}

export const checkEmailAndSendOtp : RequestHandler = async (req,res,next) => {
    try{
        const {email} = req.body
        const token = randomString.generate(6)
        const salt  = await bcrypt.genSalt(10)
        const hashedToken = await bcrypt.hash(token,salt)
        const verificationCode = {
            token : hashedToken,
            expiresAt : Date.now() + 8*1000*60
        }
        const result = await updateEmailVerificationCode(email,verificationCode)
        await sendEmailVerificationCode(email,token)
        if(!result){
            throw new APIError({
                status : 400,
                message : 'Opps... email not found.'
            })
        }
        return res.status(200).send(getSuccessResponse("Otp sent to mail for forget password.",result))
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