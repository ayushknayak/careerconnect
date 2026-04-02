import { Company } from "../models/company.model";

export default registerCompany=async (req,res)=>{
    try {
        const {name}=req.body;
        if(!name){
            res.status(400).json({
                message:'enter all field',
                success:false
            })
        }
        const company=await Company.findOne({name})
        if(company){
            return res.status(400).json({
                message:'Company already Exist',
                success:false
            })
        }
        company =await Company.create({
            name:name,
            userId:req.id
        })
        return res.status(201).json({
            message:"Company Registered successfuly",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}