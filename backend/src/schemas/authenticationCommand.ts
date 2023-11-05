import { createUser, findUserByEmail, forgetPassword, updateEmailVerificationCode, verifyEmail} from "../crud/user";
import { ICommand } from "./command";
import APIError from "../utils/APIError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import randomString from "randomstring"
import sendEmailVerificationCode from "../services/emailService";
import { IUser } from "models/user";

export class LoginCommand implements ICommand {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  async execute() {
    const secretKey : any = process.env.JWT_SECRET
    const user = await findUserByEmail(this.email);
    if (user) {
      const checkPassword = await bcrypt.compare(this.password, user.password);

      if (checkPassword) {
        if (user.isEmailVerified) {
        
          const jwtAccessToken = jwt.sign({ _id: user._id }, secretKey, {
            expiresIn: "2d",
          });
          
          return {user,jwtAccessToken}

        } else {
          const newToken = randomString.generate(6)
          const salt = await bcrypt.genSalt(10)
          const hashedToken = await bcrypt.hash(newToken,salt)
          const verificationCode = {
            token: hashedToken,
            expiresAt: Date.now() + 8 * 60 * 1000,
          };

          await updateEmailVerificationCode(this.email,verificationCode)
          await sendEmailVerificationCode(this.email,newToken)

          throw new APIError({
            status: 403,
            message:
              "Please verify your email first, a verification mail has been sent to your email.",
          });
        }
      } else {
        throw new APIError({
          status: 401,
          message: "Opps... wrong password. Please provide correct password.",
        });
      }
    } else {
      throw new APIError({
        status: 401,
        message: "Opps... email does not exists",
      });
    }
  }
}


export class RegisterCommand implements ICommand{
    name : string
    address :string
    email : string
    phone : string
    password : string

    constructor(name : string,address : string,email : string,password : string,phone : string){
        this.name = name
        this.address = address
        this.email = email
        this.phone = phone
        this.password = password
    }

    async execute(){

        const newToken = randomString.generate(6)
        const salt = await bcrypt.genSalt(10)
        const hashedToken = await bcrypt.hash(newToken,salt)
        const hashedPassword = await bcrypt.hash(this.password,salt)
        const verificationCode = {
            token : hashedToken,
            expiresAt: Date.now() + 8 * 60 * 1000, 
        }

        

        const user =  await createUser({
            name : this.name,
            address : this.address,
            email : this.email,
            password : hashedPassword,
            phone : this.phone,
            verificationCode : verificationCode
        } as IUser)

        await sendEmailVerificationCode(this.email,newToken)

        return user
    }
}

export class verificationCodeCommand implements ICommand{
    email : string
    token : string

    constructor(email : string, token : string){
        this.email = email
        this.token = token
    }

    async execute() {
        const user = await findUserByEmail(this.email)
        const secretKey : any = process.env.JWT_SECRET
        if(user)
        {
            const checkToken = await bcrypt.compare(this.token,user.verificationCode.token)
            if(checkToken){
                if(user.verificationCode.expiresAt<Date.now()){
                    const newToken = randomString.generate(6)
                    const salt = await bcrypt.genSalt(10)
                    const hashedToken = await bcrypt.hash(newToken,salt)

                    const verificationCode = {
                        token : hashedToken,
                        expiresAt: Date.now() + 8 * 60 * 1000, 
                    }
                    
                    await updateEmailVerificationCode(this.email,verificationCode)
                    await sendEmailVerificationCode(this.email,newToken)

                    throw new APIError({
                        status : 401,
                        message : "Opps... your token has been expired. Please provide new token sent to your email."
                    })
                }
                else{
                    await verifyEmail(this.email)
                    
                    const jwtAccessToken = jwt.sign({ _id: user._id }, secretKey, {
                        expiresIn: "2d",
                      });

                    return {user,jwtAccessToken}
                }
            }
            else{
                throw new APIError({
                    status : 401,
                    message : "Opps... your token is not correct. Please provide correct one."
                })
            }
        }   
        else{
            throw new APIError({
                status : 400,
                message : "Opps... Something went wrong with email. Please try again."
            })
        } 
    }
}

export class ForgetPasswordCommand implements ICommand{

  email : string
  token : string
  password : string

  constructor(email : string,token :string, password : string){
    this.email = email
    this.token = token
    this.password = password
  }

  async execute() {
    const user = await findUserByEmail(this.email)
    if(user){
      const checkToken = await bcrypt.compare(this.token,user.verificationCode.token)
      if(checkToken){
        if(user.verificationCode.expiresAt<Date.now()){
          const newToken = randomString.generate(6)
          const salt = await bcrypt.genSalt(10)
          const hashedToken = await bcrypt.hash(newToken,salt)
          const verificationCode = {
            token : hashedToken,
            expiresAt : Date.now() + 8*1000*60
          }
          await updateEmailVerificationCode(this.email,verificationCode)
          throw new APIError({
            status : 401,
            message : "Opps.. your token has been expired. A new token has been sent to your email address."
          })
        }
        else{
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(this.password,salt)
          return await forgetPassword(this.email,hashedPassword)
        }
      }
      else{
        throw new APIError({
          status : 401,
          message : "Opps... your token is not correct. Please provide proper otp."
        })
      }
    } 
    else{
      throw new APIError({
        status : 400,
        message : "Opps... email not found."
      })
    }       
  }
}
