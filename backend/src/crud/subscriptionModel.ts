import User, { INotificationObject } from "../models/user"

export const confirmSubscription = async (userId : string) => {
    return await User.findByIdAndUpdate(userId,{
        $set : {
            subscribed : true
        }
    },{
        returnOriginal : false
    }).lean()
}

export const confirmSubscriptionRemoval =async (userId : string) => {
    return await User.findByIdAndUpdate(userId,{
        $set : {
            subscribed : false,
            notifications : []
        }
    },{
        returnOriginal : false
    }).lean()
}

export const pushNotifications =async (notificationObject : INotificationObject) => {
    return await User.updateMany({
        subscribed : true
    },{
        $push : {
            notifications : notificationObject
        }
    })
}