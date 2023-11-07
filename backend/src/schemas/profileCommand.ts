import APIError from "../utils/APIError";
import { editPassword, editProfile, findUserById, findUserWithPassword } from "../crud/user";
import { ICommand } from "./command";
import bcrypt from "bcrypt"
import { uploadPhotoToFirebase } from "../services/firebaseStorage";

export interface IProfile{
    userId : string
    name  : string
    address : string
    phone : string
    image : string
    imageData ?:string
}


export class ProfileDetailsCommand implements ICommand{

    userId : string

    constructor(userId : string){
        this.userId = userId
    }

    async execute() {
        return await findUserById(this.userId)
    }
}

export class ChangeProfileCommand  implements ICommand{

    profile : IProfile

    constructor(profile : IProfile){
        this.profile = profile
    }

    async execute() {
        if(this.profile.imageData){
            const downloadURL = await uploadPhotoToFirebase(this.profile.imageData,this.profile.userId);
            delete this.profile["imageData"];
            this.profile.image = downloadURL;
        }
        return await editProfile(this.profile)
    }
}

export class ChangePasswordCommand implements ICommand{

    userId : string
    previousPassword : string
    newPassword : string

    constructor(userId : string,previousPassword : string,newPassword : string){
        this.userId = userId
        this.previousPassword = previousPassword
        this.newPassword = newPassword
    }

    async execute() {
        const user = await findUserWithPassword(this.userId)
        if(!user){
            throw new APIError({
                status : 401,
                message: "User not found."
            })
        }
        const checkPassword = await bcrypt.compare(this.previousPassword,user.password)
        if(checkPassword){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(this.newPassword,salt)
            return await editPassword(this.userId,hashedPassword)
        }   
        else{
            throw new APIError({
                status : 401,
                message: "Incorrect previous password"
            })
        }                 
    }
}