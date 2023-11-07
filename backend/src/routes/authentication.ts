import express from "express"
import { checkEmailAndSendOtp, emailVerification, forgetPassword, login, register } from "../controllers/authentication"
import { validate } from "express-validation"
import { validateEmailVerification, validateForgetPassword, validateLogin, validateRegister, validateSendOtp } from "../validations/authentication"

const router = express.Router()

router.post("/login",validate(validateLogin),login)
router.post("/register",validate(validateRegister),register)
router.put("/verifyEmail",validate(validateEmailVerification),emailVerification)
router.put("/sendOtp",validate(validateSendOtp),checkEmailAndSendOtp)
router.put('/forgetPassword',validate(validateForgetPassword),forgetPassword)

export default router