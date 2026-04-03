import express from 'express';


import isAuth from '../middleware/isAuth.middleware.js';
import { applyjob, getApplicants, getappliedjob, updateStatus } from '../controllers/application.controller.js';


const router=express.Router()

router.route("/apply/:id").post(isAuth,applyjob)
router.route("/get").get(isAuth,getappliedjob)
router.route("/applicant/:id").get(isAuth,getApplicants)
router.route("/status/update/:id").post(isAuth,updateStatus)

export default router;