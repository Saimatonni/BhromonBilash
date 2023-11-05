import { RequestHandler } from "express";
import { getSuccessResponse } from "../utils/helper";
import {  CancelBookingCommand, GetBookingsCommand, ICommand, Invoker } from "../schemas/command";
import { FactoryMethod } from "../schemas/factoryMethod";
import APIError from "../utils/APIError";
import { deleteBooking } from "../crud/booking";

export const convertToDate = (dateAsString : string) : Date => {
    const [day, month, year] = dateAsString
      .split("-")
      .map(Number);
    return new Date(year, month - 1, day + 1);
} 

export const makeBooking : RequestHandler =async (req : any,res,next) => {
    try{
        const budgetType : string = req.query.budgetType as string
        const userId = req.user._id

        const booking = req.body
        if(budgetType!==booking.budgetType){
            throw new APIError({
                status : 500,
                message : "Query param and budget type in body does not match !!!"
            })
        }

        booking.uptrip.date = convertToDate(booking.uptrip.date)
        booking.downtrip.date = convertToDate(booking.downtrip.date)
        booking.bookingDates.start = convertToDate(booking.bookingDates.start)
        booking.bookingDates.end = convertToDate(booking.bookingDates.end)
        booking.userId = userId

        const command : ICommand = new FactoryMethod().bookingFactoryMethod(budgetType,booking)
        const invoker = new Invoker(command)
        const result = await invoker.execute()
        return res.status(200).send(getSuccessResponse("A booking has been done. Please check the booking part of your profile to confirm.",result))
    }
    catch(error){
        next(error)
    }
} 

export const getBookings : RequestHandler =async (req,res,next) => {
    try{
        const userId = req.query.userId
        const command : ICommand = new GetBookingsCommand(userId as string)
        const invoker = new Invoker(command) 
        const result = await invoker.execute()
        return res.status(200).send(getSuccessResponse("Bookings fetched successfully",result))
    }
    catch(error){
        next(error)
    }
}

export const cancelBooking : RequestHandler = async (req,res,next) => {
    const {bookingId} = req.body
    const command : ICommand = new CancelBookingCommand(bookingId)
    const invoker = new Invoker(command)
    const deletedBooking = await invoker.execute()
    return res.status(200).send(getSuccessResponse("Booking deleted successfully",deletedBooking))

}