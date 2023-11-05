import express from "express"
import { checkEmailAndSendOtp, emailVerification, forgetPassword, login, register } from "../controllers/authentication"

const router = express.Router()

router.post("/login",login)
router.post("/register",register)
router.put("/verifyEmail",emailVerification)
router.put("/sendOtp",checkEmailAndSendOtp)
router.put('/forgetPassword',forgetPassword)

export default router