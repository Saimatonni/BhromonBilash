import { EDiscountTo, EDiscountType, IDiscount } from "../models/threeStarHotel"
import APIError from "../utils/APIError"
import { FactoryMethod } from "./factoryMethod"

export class Hotel{

    id : string
    factoryMethod : FactoryMethod

    constructor(id : string){
        this.id = id
        this.factoryMethod = new FactoryMethod()
    }

    getHotelByIdCommand(budgetType : string){
        return this.factoryMethod.hotelByIdFactoryMethod(budgetType,this.id)
    }


    getSingleBedRoomPrice(hotel : any) : number{
        return hotel.singleBedRooms.reduce((accumulator,currentvalue)=>{
           if(currentvalue.seaFacing){
               return accumulator + hotel.singleBedPrice + hotel.seaFacingExtraPrice
           }
           else if(currentvalue.hillFacing){
               return accumulator + hotel.singleBedPrice + hotel.hillFacingExtraPrice
           }
           else{
               return accumulator + hotel.singleBedPrice
           }
       },0)
    }
       
       getDoubleBedRoomPrice(hotel : any) : number{
           return hotel.doubleBedRooms.reduce((accumulator,currentvalue)=>{
               if(currentvalue.seaFacing){
                   return accumulator + hotel.doubleBedPrice + hotel.seaFacingExtraPrice
               }
               else if(currentvalue.hillFacing){
                   return accumulator + hotel.doubleBedPrice + hotel.hillFacingExtraPrice
               }
               else{
                   return accumulator + hotel.doubleBedPrice
               }
           },0)
       }

       processDiscounts(hotel : any,singleBedRoomPrice : number,doubleBedRoomPrice : number) :number{
            let totalPrice = singleBedRoomPrice + doubleBedRoomPrice
            hotel.discount.forEach((element : IDiscount)=> {
                if(element.to===EDiscountTo.SINGLE){
                    if(element.type===EDiscountType.PERCENT){
                        singleBedRoomPrice -= ((singleBedRoomPrice*element.amount)/100)
                        totalPrice = singleBedRoomPrice + doubleBedRoomPrice
                    }
                    else if(element.type===EDiscountType.TAKA){
                        singleBedRoomPrice -= (hotel.singleBedRooms.length*element.amount)
                        totalPrice = singleBedRoomPrice + doubleBedRoomPrice
                    }
                    else{
                        throw new APIError({
                            status : 500,
                            message : "Error while calculating discount"
                        })
                    }
                }
                else if(element.to===EDiscountTo.DOUBLE){
                    if(element.type===EDiscountType.PERCENT){
                        doubleBedRoomPrice -= ((doubleBedRoomPrice*element.amount)/100)
                        totalPrice = singleBedRoomPrice + doubleBedRoomPrice
                    }
                    else if(element.type===EDiscountType.TAKA){
                        doubleBedRoomPrice -= (hotel.doubleBedRooms.length*element.amount)
                        totalPrice = singleBedRoomPrice + doubleBedRoomPrice
                    }
                    else{
                        throw new APIError({
                            status : 500,
                            message : "Error while calculating discount"
                        })
                    }
                }
                else if(element.to===EDiscountTo.ALL){
                    if(element.type===EDiscountType.PERCENT){
                        singleBedRoomPrice -= ((singleBedRoomPrice*element.amount)/100)
                        doubleBedRoomPrice -= ((doubleBedRoomPrice*element.amount)/100)
                        totalPrice = singleBedRoomPrice + doubleBedRoomPrice
                    }
                    else{
                        throw new APIError({
                            status : 500,
                            message : "Error while calculating discount"
                        })
                    }
                }
                else if(element.to===EDiscountTo.TOTAL){
                    if(element.type===EDiscountType.TAKA){
                        totalPrice -= element.amount
                        singleBedRoomPrice -= element.amount/2
                        doubleBedRoomPrice -= element.amount/2 
                    }
                    else{
                        throw new APIError({
                            status : 500,
                            message : "Error while calculating discount"
                        })
                    }
                }               
            });
            return totalPrice
       }
}