import express from 'express';


import isAuth from '../middleware/isAuth.middleware.js';
import { getAdminJob, getAlljob, postjob, getjobbyid } from '../controllers/job.controller.js';


const router=express.Router()

router.route("/postJob").post(isAuth,postjob)
router.route("/getAllJob").get(isAuth,getAlljob)

router.route("/get/:id").get(isAuth,getjobbyid)
router.route("/getAdminJob").get(isAuth,getAdminJob)

export default router;