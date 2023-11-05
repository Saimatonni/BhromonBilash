import { excludeFields } from "../utils/helper"
import User, { IUser, IVerificationCode } from  "../models/user"

export const createUser =async (user : IUser) => {
    return await User.create(user)
} 

export const findUserByEmail =async (email :  string) => {
    return await User.findOne({email},excludeFields()).lean()
}

export const updateEmailVerificationCode =async (email :string,verificationCode : IVerificationCode) => {
    return await User.findOneAndUpdate({email},{
        $set : {
            verificationCode
        }
    },{
        returnOriginal : false
    }).lean()
}

export const verifyEmail =async (email : string) => {
    return await User.findOneAndUpdate({email},{
        $set : {
            isEmailVerified : true
        }
    },{
        returnOriginal : false
    }).lean()
}

export const forgetPassword = async (email : string,password: string) => {
    return await User.findOneAndUpdate({email},{
        $set : {
            password
        }
    },{
        returnOriginal : false
    }).lean()
}

export const findUserById =async (userId : string) => {
    return await User.findById(userId,excludeFields({
        _id : 0,
        address : 0,
        phone : 0,
        password : 0,
        isEmailVerified : 0,
        notifications : 0,
        subscribed : 0,
        email : 0
    })).lean()
}