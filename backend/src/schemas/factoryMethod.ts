import { EBudgetType, IBooking } from "../models/booking";
import {  HighCostTourFactory,MidCostTourFactory,LowCostTourFactory } from "../schemas/tourFactory";
import APIError from "../utils/APIError";
import { BookingCommandFiveStarRooms, BookingCommandFourStarRooms, BookingCommandThreeStarRooms } from "./bookingCommand";
import { FiveStarHotelRatingCommand, FourStarHotelRatingCommand, ThreeStarHotelRatingCommand } from "./ratingCommand";
import { IHotelRating } from "../models/hotelRating";
import { GetFiveStarHotelCommand, GetFourStarHotelCommand, GetThreeStarHotelCommand } from "./hotelCommand";


export class FactoryMethod{

    tourFactoryMethod = (budgetType : string)=>{
        if(budgetType===EBudgetType.LOW){
            return new LowCostTourFactory()
        }
        else if(budgetType===EBudgetType.MID){
            return new MidCostTourFactory()
        }
        else if(budgetType===EBudgetType.HIGH){
            return new HighCostTourFactory()
        }
        else{
            throw new APIError({
                status : 400,
                message : "Something went wrong with query param budgetType. Please try again."
            })
        }
    }

    hotelByIdFactoryMethod(budgetType : string,hotelId : string){
        if(budgetType===EBudgetType.LOW){
            return new GetThreeStarHotelCommand(hotelId)
        }
        else if(budgetType===EBudgetType.MID){
            return new GetFourStarHotelCommand(hotelId)
        }
        else if(budgetType===EBudgetType.HIGH){
            return new GetFiveStarHotelCommand(hotelId)
        }
        else{
            throw new APIError({
                status : 400,
                message : "Something went wrong with query param. Please try again."
            })
        }
    }

    bookingFactoryMethod = (budgetType : string,booking : IBooking)=>{
        if(budgetType===EBudgetType.LOW){
            return new BookingCommandThreeStarRooms(booking)
        }
        else if(budgetType===EBudgetType.MID){
            return new BookingCommandFourStarRooms(booking)
        }
        else if(budgetType===EBudgetType.HIGH){
            return new BookingCommandFiveStarRooms(booking)
        }
        else{
            throw new APIError({
                status : 400,
                message : "Something went wrong with query param. Please try again."
            })
        }
    }

    hotelRatingFactoryMethod = (budgetType : string,hotelRating : IHotelRating)=>{
        if(budgetType===EBudgetType.LOW){
            return new ThreeStarHotelRatingCommand(hotelRating)
        }
        else if(budgetType===EBudgetType.MID){
            return new FourStarHotelRatingCommand(hotelRating)
        }
        else if(budgetType===EBudgetType.HIGH){
            return new FiveStarHotelRatingCommand(hotelRating)
        }
        else{
            throw new APIError({
                status : 400,
                message : "Something went wrong with query param. Please try again."
            })
        }
    }
    
}