import { Application } from "../models/application.model.js"
import { Job } from '../models/job.model.js'

export const applyjob = async (req, res) => {
    const userId = req.id
    const jobId = req.params.id
    if (!jobId) {
        return res.status(404).json({
            message: "Job id is required",
            success: false
        })
    }
    const existingapp = await Application.findOne({ job: jobId, applicant: userId })
    if (existingapp) {
        return res.status(400).json({
            message: "Already applied",
            message: false
        })
    }
    const job = await Job.findById(jobId)
    if (!job) {
        return res.status(404).json({
            message: "jon not found",
            message: false
        })
    }

    const newapp = await Application.create({
        job: jobId,
        applicant: userId
    })

    job.applications.push(newapp._id)
    await job.save()
    return res.status(201).json({
        message: "Job Applied Successfully",
        success: true
    })
}

export const getappliedjob = async (req, res) => {
    try {
        const userId=req.id
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });
        if (!application) {
            return res.status(404).json({
                message: "Not applied yet",
                success: false
            })
        }
        return res.status(201).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });
        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            })
        };
        return res.status(200).json({
            job,
            succees: true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: 'status is required',
                success: false
            })
        };


        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            })
        };

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}