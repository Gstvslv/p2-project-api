import { Request, Response } from 'express';
import { JobService } from '../services/job.service';

const jobService = new JobService();

export class JobController {

    async create(req: Request, res: Response) {
        try {
            const job = await jobService.create(req.body);
            res.status(201).json(job);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getJobsByContractId(req: Request, res: Response) {
        try {
            const contractId = parseInt(req.params.contractId);
            const jobs = await jobService.getJobsByContractId(contractId);
            res.status(200).json(jobs);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUnpaidJobs(req: Request, res: Response) {
        try {
            const contractId = parseInt(req.params.contractId);
            const unpaidJobs = await jobService.getUnpaidJobs(contractId);
            res.status(200).json(unpaidJobs);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }


    async getJobById(req: Request, res: Response) {
        try {
            const job = await jobService.getJobById(parseInt(req.params.id));
            res.status(200).json(job);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const jobData = req.body;
            const updatedJob = await jobService.updateJob(parseInt(req.params.id), jobData);
            res.status(200).json(updatedJob);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const deletedJob = await jobService.deleteJob(parseInt(req.params.id));
            res.status(200).json(deletedJob);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }
}