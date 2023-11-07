import { authenticateUserJWTToken } from "../middleware/authentication"
import { changePassword, changeProfile, getProfileDetils } from "../controllers/profile"
import express from "express"
import { validate } from "express-validation"
import { validateChangePassword, validateChangeProfile } from "../validations/profile"

const router = express.Router()

router.get('/',authenticateUserJWTToken(),getProfileDetils)
router.put('/changeProfile',authenticateUserJWTToken(),validate(validateChangeProfile),changeProfile)
router.put('/changePassword',authenticateUserJWTToken(),validate(validateChangePassword),changePassword)

export default router