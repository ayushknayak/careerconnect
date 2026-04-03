import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connecttoDB from './utils/db.js';
import userRouter from '../backend/routes/user.route.js';
import companyRouter from '../backend/routes/company.route.js';
import jobRouter  from '../backend/routes/job.route.js';
import applicationRouter from "../backend/routes/application.route.js";

dotenv.config({});
const app=express();

app.use(express.json());
app.use(express(urlencoded({extended:true})));
app.use(cookieParser());
const corsOption={
    origin:'http://localhost:5173',
    credentials:true
}




app.use(cors(corsOption));
const PORT=process.env.PORT||9000;

app.use("/api/user",userRouter)
app.use("/api/company",companyRouter)
app.use("/api/job",jobRouter)
app.use("/api/application",applicationRouter)

app.listen(PORT,()=>{
    connecttoDB()
    console.log(`Server up at http://localhost:${PORT}`)
})