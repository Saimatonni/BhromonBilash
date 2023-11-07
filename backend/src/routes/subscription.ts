import { authenticateUserJWTToken } from "../middleware/authentication"
import { pushNotifications, requestForSubscription, requestForSubscriptionRemoval } from "../controllers/subscriptionModel"
import express from "express"

const router = express.Router()

router.put('/request',authenticateUserJWTToken(),requestForSubscription)
router.put('/remove',authenticateUserJWTToken(),requestForSubscriptionRemoval)

//admin side routes
router.post('/push',pushNotifications)

export default router