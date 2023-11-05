import mongoose, { ObjectId } from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;


export interface IFourStarHotel{
    tourId : ObjectId,
    name : string,
    image : string,
    address : string
    description : string,
    singleBedPrice : number,
    doubleBedPrice : number,
    seaFacingExtraPrice : number,
    hillFacingExtraPrice : number,
    distance : number,
    discount : Array<Object>,
    rating  : number,
    numberOfRatings : number
    createdAt : Date,
    updatedAt : Date,
    deletedAt : Date
}

const schemaFields: Record<keyof Omit<IFourStarHotel, '_id'>, any> = {
    tourId : {
      type : ObjectId,
      required : true
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required : true
    },
    address : {
      type : String,
      required : true
    },
    description: {
      type: String,
      required : true
    },
    singleBedPrice :{
      type : Number,
      required : true
    },
    doubleBedPrice :{
      type : Number,
      required : true
    },
    seaFacingExtraPrice :{
      type : Number,
      required : true
    },
    hillFacingExtraPrice :{
      type : Number,
      required : true
    },
    distance :{
      type : Number,
      required : true
    },
    discount : {
      type : Array<Object>,
      default : []
    },
    rating : {
      type : Number,
      default : 0
    },
    numberOfRatings : {
      type : Number,
      default : 0
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
  
  const fourStarHotelSchema = new mongoose.Schema(schemaFields, { timestamps: true });
  
  export default mongoose.model<IFourStarHotel>('FourStarHotel', fourStarHotelSchema);
  