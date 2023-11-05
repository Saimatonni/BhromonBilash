import mongoose from "mongoose";
import { ObjectId } from "mongoose";
import { ITrip } from "../schemas/command";
import { IBookedDates } from "../crud/room";

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export enum EBudgetType{
    LOW = "LOW",
    MID = "MID",
    HIGH = "HIGH"
}

export interface IBooking{
    tourId : ObjectId,
    tourName : string,
    tourImages : Array<string>,
    userId : ObjectId,
    hotelId : ObjectId,
    hotelName : string,
    uptrip : ITrip
    downtrip : ITrip,
    bookingDates : IBookedDates
    singleBedRoomIds : Array<ObjectId>,
    doubleBedRoomIds : Array<ObjectId>
    hotelCharge : number,
    totalPrice : number
    tourGuide : boolean,
    budgetType : EBudgetType
    createdAt : Date
    updatedAt : Date,
    deletedAt : Date
}

const schemaFields: Record<keyof Omit<IBooking, '_id'>, any> = {
    tourId : {
        type : ObjectId,
        required : true
    },
    tourName : {
        type : String,
        required : true,
    },
    tourImages : {
        type : Array<String>,
        required : true
    },
    userId : {
        type : ObjectId,
        required : true
    },
    hotelId : {
        type : ObjectId,
        required : true
    },
    hotelName : {
        type : String,
        required : true
    },
    uptrip : {
        type: new mongoose.Schema(
            {
              source: String,
              time: String,
              totalPrice: Number,
              totalPersons: Number,
              travelId: ObjectId,
              date: Date,
            },
            { _id: false } // Exclude _id from the subdocument
          ),
          required: true,
    },
    downtrip : {
        type: new mongoose.Schema(
            {
              source: String,
              time: String,
              totalPrice: Number,
              totalPersons: Number,
              travelId: ObjectId,
              date: Date,
            },
            { _id: false } // Exclude _id from the subdocument
          ),
          required: true,
    },
    bookingDates : {
        type : Object,
        required : true
    },
    singleBedRoomIds : {
        type : [ObjectId],
        required : true
    },
    doubleBedRoomIds : {
        type : [ObjectId],
        required : true
    },
    hotelCharge : {
        type : Number,
        required : true
    },
    totalPrice : {
        type : Number,
        required : true
    },
    tourGuide : {
        type : Boolean,
        default : false
    },
    budgetType : {
        type : String,
        required : true,
        enum : Object.values(EBudgetType)
    },
    createdAt: {
      type: Date,
      default: null
    },
    updatedAt: {
      type: Date,
      default: null
    },
    deletedAt: {
      type: Date,
      default: null
    }
  };
  
  const bookingSchema = new mongoose.Schema(schemaFields, { timestamps: true });
  
  export default mongoose.model<IBooking>('Booking',bookingSchema);
  