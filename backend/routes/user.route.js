import express from 'express';

import { login, logout, register, updateProfile } from '../controllers/user.controller.js';
import isAuth from '../middleware/isAuth.middleware.js';


const router=express.Router()

router.route("/register").post(register)
router.route("/login").post(login)

router.route("/profile/update").post(isAuth,updateProfile)
router.route("/logout").post(logout)

export default router;