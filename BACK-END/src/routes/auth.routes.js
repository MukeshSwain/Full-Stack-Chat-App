import express from 'express'
import { login, signup, logout, updateProfile, checkAuth } from '../controllers/auth.controller.js'
import { protectRoute } from '../middlewareres/auth.middleware.js'

const router = express.Router()


router.post('/login', login)

router.post("/signup",signup);

router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check",protectRoute,checkAuth)

export default router