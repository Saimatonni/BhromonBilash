import { confirmSubscription, confirmSubscriptionRemoval, pushNotifications } from "../crud/subscriptionModel"
import { INotificationObject } from "../models/user"

export interface ISubscriber{
    update(notificationObject)
    requestForSubscription()
    requestForSubscriptionRemoval()
    getId()
}

export class SubscriberClient implements ISubscriber{

    userId : string 
    notificationSystem : INotificationSubject

    constructor(userId : string,notificationSystem : INotificationSubject){
        this.userId = userId
        this.notificationSystem = notificationSystem
    }

    async update(notificationObject : INotificationObject) {
        return await pushNotifications(notificationObject)
    }
    async requestForSubscription() {
        return await this.notificationSystem.registerSubscriber(this)
    }
    async requestForSubscriptionRemoval() {
        return await this.notificationSystem.removeSubscriber(this)
    }

    getId() {
        return this.userId
    }

}

export interface INotificationSubject {
    registerSubscriber(subscriber : ISubscriber);
    removeSubscriber(subscriber : ISubscriber);
    notifySubscribers(notificationObject :  INotificationObject);
    setSubscriber(subscriber : ISubscriber | Array<ISubscriber>)
}

export class NotificationSystem implements INotificationSubject{

    subscriber : ISubscriber

    setSubscriber(subscriber : ISubscriber){
        this.subscriber = subscriber
    }

    async registerSubscriber(subscriber: ISubscriber) {
        return await confirmSubscription(subscriber.getId())
    }

    async removeSubscriber(subscriber: ISubscriber) {
        return await confirmSubscriptionRemoval(subscriber.getId())
    }

    async notifySubscribers(notificationObject : INotificationObject) {
        return this.subscriber.update(notificationObject)
    }

}
