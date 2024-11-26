import { JobRepository } from "../repositories/job.repository";
import { Job } from '@prisma/client';

const jobRepo = new JobRepository();

export class JobService {


    async create(jobData: Job): Promise<Job> {
        return jobRepo.create(jobData);
    }

    async getJobsByContractId(contractId: number): Promise<Job[]> {
        return jobRepo.getByContractId(contractId);
    }

    async getUnpaidJobs(contractId: number): Promise<Job[]> {
        return jobRepo.getUnpaidJobs(contractId);
    }

    async getJobById(id: number): Promise<Job | null> {
        const job = await jobRepo.getById(id);
        if (!job) {
            throw new Error(`Job with ID ${id} not found`);
        }
        return job;
    }

    async updateJob(id: number, jobData: Partial<Job>): Promise<Job> {
        const updatedJob = await jobRepo.update(id, jobData);
        if (!updatedJob) {
            throw new Error(`Job with ID ${id} not found`);
        }
        return updatedJob;
    }

    async deleteJob(id: number): Promise<Job | null> {
        const deletedJob = await jobRepo.delete(id);
        if (!deletedJob) {
            throw new Error(`Job with ID ${id} not found`);
        }
        return deletedJob;
    }
}