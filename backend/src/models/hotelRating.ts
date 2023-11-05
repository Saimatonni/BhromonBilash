import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

export interface IHotelRating{
    bookingId : string
    userId : string,
    userImage : string,
    userName : string,
    hotelId : string
    rating : number,
    review : string
    createdAt : Date
    updatedAt : Date
    deletedAt : Date
}

const schemaFields: Record<keyof Omit<IHotelRating, '_id'>, any> = {
    bookingId : {
        type : ObjectId,
        required : true
    },
    userId : {
        type : ObjectId,
        required : true,
    },
    userImage : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    },
    hotelId : {
        type : ObjectId,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    review : {
        type : String,
        default : null
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
  
  const hotelRatingSchema = new mongoose.Schema(schemaFields, { timestamps: true });
  
  export default mongoose.model<IHotelRating>('HotelRating', hotelRatingSchema);
  