import mongoose from "mongoose";
import { ObjectId } from "mongoose";

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export interface INonACTravel{
    tourId : ObjectId,
    time : Array<string>,
    charge : number,
    source : string,
    createdAt : Date,
    updatedAt : Date,
    deletedAt : Date
}

const schemaFields: Record<keyof Omit<INonACTravel, '_id'>, any> = {
    tourId : {
      type : ObjectId,
      required : true
    },
    time: {
      type: Array<String>,
      required: true
    },
    charge: {
      type: Number,
      required : true
    },
    source : {
      type : String,
      required : true
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
  
  const nonACTravelSchema = new mongoose.Schema(schemaFields, { timestamps: true });
  
  export default mongoose.model<INonACTravel>('NonACTravel', nonACTravelSchema);
  