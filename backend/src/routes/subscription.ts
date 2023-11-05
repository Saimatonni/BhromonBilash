import { pushNotifications, requestForSubscription, requestForSubscriptionRemoval } from "../controllers/subscriptionModel"
import express from "express"

const router = express.Router()

router.put('/request',requestForSubscription)
router.put('/remove',requestForSubscriptionRemoval)
router.post('/push',pushNotifications)

export default router