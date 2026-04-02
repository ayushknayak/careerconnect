import express from 'express';

import {registerCompany,getcompany,getcompanybyid,updatecompany} from '../controllers/company.controller.js';
import isAuth from '../middleware/isAuth.middleware.js';


const router=express.Router()

router.route("/register").post(isAuth,registerCompany)
router.route("/get").get(isAuth,getcompany)

router.route("/get/:id").get(isAuth,getcompanybyid)
router.route("/update/:id").put(isAuth,updatecompany)

export default router;