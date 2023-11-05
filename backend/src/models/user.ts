import mongoose from "mongoose"

enum EMessageType{
    NEWTOUR = "NEWTOUR",
    NEWHOTEL = "NEWHOTEL",
    DISCOUNT = "DISCOUNT",
    OTHERS = "OTHERS"
}

export interface IVerificationCode{
  token : string,
  expiresAt : number
}

export interface INotificationObject{
    date : Date,
    message : string
    messageType : EMessageType
}

export interface IUser{
    name : string,
    email : string,
    password : string,
    address : string,
    phone : string
    image : string,
    subscribed : boolean
    notifications : [INotificationObject]
    isEmailVerified : boolean
    verificationCode : IVerificationCode
    createdAt : Date
    updatedAt : Date
    deletedAt : Date
}

const schemaFields: Record<keyof Omit<IUser, '_id'>, any> = {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required : true,
      unique : true
    },
    password: {
      type: String,
      required : true
    },
    address : {
        type: String,
        required : true
    },
    phone : {
        type: String,
        required : true,
        unique : true
    },
    image : {
        type: String,
        default : process.env.PROFILE_PICTURE
    },
    subscribed : {
        type : Boolean,
        default : false
    },
    notifications : {
        type : Array<INotificationObject>,
        default : []
    },
    isEmailVerified :{
      type : Boolean,
      default : false
    },
    verificationCode : {
      type : Object,
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
  
  const userSchema = new mongoose.Schema(schemaFields, { timestamps: true });
  
  export default mongoose.model<IUser>('User', userSchema);
  