import mongoose, { ObjectId } from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

interface IBookedDates{
    start : Date,
    end : Date
}

export interface IDoubleBedFiveStar{
    number : string,
    hotelId : ObjectId,
    seaFacing : boolean,
    hillFacing : boolean,
    bookedDates : Array<IBookedDates>
    createdAt : Date,
    updatedAt : Date,
    deletedAt : Date
}

const schemaFields: Record<keyof Omit<IDoubleBedFiveStar, '_id'>, any> = {
    number : {
      type : String,
      required : true
    },
    hotelId: {
      type: ObjectId,
      required: true
    },
    seaFacing: {
      type: Boolean,
      default : false
    },
    hillFacing : {
      type : Boolean,
      default : false
    },
    bookedDates: {
      type: Array<IBookedDates>,
      default : []
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
  
  const doubleBedFiveStarSchema = new mongoose.Schema(schemaFields, { timestamps: true });
  
  export default mongoose.model<IDoubleBedFiveStar>('DoubleBedFiveStar', doubleBedFiveStarSchema);
  