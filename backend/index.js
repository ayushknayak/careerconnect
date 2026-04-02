import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connecttoDB from './utils/db.js';
import router from '../backend/routes/user.route.js';

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

app.use("/api/user",router)


app.listen(PORT,()=>{
    connecttoDB()
    console.log(`Server up at http://localhost:${PORT}`)
})