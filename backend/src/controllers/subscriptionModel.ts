import { RequestHandler } from "express";
import { ISubscriber, NotificationSystem, SubscriberClient } from "../schemas/subscriptionModel";
import { getSuccessResponse } from "../utils/helper";
import { INotificationObject } from "../models/user";

export const requestForSubscription : RequestHandler =async (req: any,res,next) => {
    try{
        const userId = req.user._id
        const notificationSystem = new NotificationSystem()
        const subscriber : ISubscriber = new SubscriberClient(userId as string,notificationSystem)
        const result = subscriber.requestForSubscription()
        return res.status(200).send(getSuccessResponse("You have subscribed succesfully",result))
    }
    catch(error)
    {
        next(error)
    }
}

export const requestForSubscriptionRemoval : RequestHandler =async (req : any,res,next) => {
    try{
        const userId = req.user._id
        const notificationSystem = new NotificationSystem()
        const subscriber : ISubscriber = new SubscriberClient(userId as string,notificationSystem)
        const result = subscriber.requestForSubscriptionRemoval()
        return res.status(200).send(getSuccessResponse("Your subscrition has been removed succesfully",result))
    }
    catch(error)
    {
        next(error)
    }
}


//admin side method
export const pushNotifications : RequestHandler =async (req,res,next) => {
    try{
        const {message, messageType} = req.body
        const notificationObject : INotificationObject = {
            message :  message,
            messageType : messageType,
            date : new Date()
        }
        const notificationSystem = new NotificationSystem()
        notificationSystem.setSubscriber(new SubscriberClient("",notificationSystem))
        const result = await notificationSystem.notifySubscribers(notificationObject)
        return res.status(200).send(getSuccessResponse("Notifications posted successfully",result))       
    }
    catch(error){
        next(error)
    }
}