import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

export const postjob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Input all things",
                success: false
            })
        };

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        })
        return res.status(201).json({
            message: "Job created successfuly",
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAlljob = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const job=await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1})
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(201).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getjobbyid = async (req, res) => {
    try {
        const JobId = req.params.id
        const job = await Job.findById(JobId)
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(201).json({
            job,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

export const getAdminJob = async (req, res) => {
    try {
        const AdminId = req.id

        const job = await Job.find({ created_by: AdminId })
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}