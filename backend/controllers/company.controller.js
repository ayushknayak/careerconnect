import { Company } from "../models/company.model.js";

export const registerCompany=async (req,res)=>{
    try {
        const {name}=req.body;
        if(!name){
            res.status(400).json({
                message:'enter all field',
                success:false
            })
        }
        let company=await Company.findOne({name})
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

export const getcompany=async(req,res)=>{
  try {
    const userId=req.id
    const company=await Company.find({userId})
    if(!company){
        return res.status(404).json({
            message:'Company Not found',
            success:false
        })
    }
    return res.status(200).json({
        company,
        success:true
    })


  } catch (error) {
    console.log(error)
  }
}

export const getcompanybyid=async(req,res)=>{
    try {
        const companyid=req.params.id
        const company=await Company.findById(companyid)
        if(!company){
            return res.status(404).json({
            message:'Company Not found',
            success:false
        })
        }
        return res.status(201).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updatecompany=async(req,res)=>{
    try {
        const {name,description,website,location}=req.body
       

    const updateData={name,description,website,location}

    const company=await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});

    if(!company){
        return res.status(404).json({
            message:"Company Not Found",
            success:false
        })
    }
    return res.status(200).json({
        message:"Updated Company data Successfully",
        success:true
    })
    } catch (error) {
        console.log(error)
    }
}