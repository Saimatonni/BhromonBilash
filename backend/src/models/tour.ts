import mongoose from "mongoose"

export interface ITour{
    name : string
    images : Array<string>
    description : string
    tourGuidePrice : number
    rating : number,
    numberOfRatings : number
    featured : boolean,
    location : string
    createdAt : Date
    updatedAt : Date
    deletedAt : Date
}

const schemaFields: Record<keyof Omit<ITour, '_id'>, any> = {
    name: {
      type: String,
      required: true,
      unique : true
    },
    images: {
      type: [String],
      default: []
    },
    description: {
      type: String,
      required : true
    },
    tourGuidePrice : {
      type : Number,
      required : true
    },
    rating : {
      type : Number,
      default : 0
    },
    numberOfRatings : {
      type : Number,
      default : 0
    },
    featured : {
      type : Boolean,
      default : false
    },
    location : {
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
  
  const tourSchema = new mongoose.Schema(schemaFields, { timestamps: true });
  
  export default mongoose.model<ITour>('Tour', tourSchema);
  