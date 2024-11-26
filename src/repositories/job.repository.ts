import { prisma } from "../database/prisma-client";
import { Job } from '@prisma/client';

export class JobRepository {

    // Criar um Job
    async create(jobData: Job): Promise<Job> {
        return prisma.job.create({
            data: jobData
        });
    }
    async updatePaymentStatus(jobId: number): Promise<void> {
        const job = await prisma.job.findUnique({
            where: { id: jobId },
            include: { payments: true }
        });

        if (!job) throw new Error(`Job with ID ${jobId} not found`);
        const totalPaid = job.payments.reduce((sum, payment) => sum + payment.paymentValue, 0);
        const isPaid = totalPaid >= job.price;
        await prisma.job.update({
            where: { id: jobId },
            data: {
                paid: isPaid ? 1 : 0
            }
        });
    }

    async getByContractId(contractId: number): Promise<Job[]> {
        return prisma.job.findMany({
            where: { contractId },
            include: { payments: true }
        });
    }

    async getUnpaidJobs(contractId: number): Promise<Job[]> {
        const jobs = await prisma.job.findMany({
            where: {
                contractId,
            },
            include: { payments: true }
        });
        return jobs.filter(job => {
            const totalPaid = job.payments.reduce((sum, payment) => sum + payment.paymentValue, 0);
            return totalPaid < job.price;
        });
    }

    async getById(id: number): Promise<Job | null> {
        return prisma.job.findUnique({
            where: { id },
            include: { payments: true }
        });
    }

    async update(id: number, jobData: Partial<Job>): Promise<Job | null> {
        return prisma.job.update({
            where: { id },
            data: jobData
        });
    }

    async delete(id: number): Promise<Job | null> {
        return prisma.job.delete({
            where: { id }
        });
    }
}