import { prisma } from "../database/prisma-client";
import { Payment } from '@prisma/client';
import { JobRepository } from "./job.repository";

const jobRepository =  new JobRepository();

export class PaymentRepository {

    // async create(paymentData: Payment): Promise<Payment> {
    //     return prisma.payment.create({
    //         data: paymentData
    //     });
    // }
    async create(paymentData: Payment): Promise<Payment> {
        // Primeiro, criamos o pagamento
        const payment = await prisma.payment.create({
            data: paymentData
        });

        await jobRepository.updatePaymentStatus(payment.jobId);

        return payment;
    }

    async getByJobId(jobId: number): Promise<Payment[]> {
        return prisma.payment.findMany({
            where: { jobId }
        });
    }

    async getById(id: number): Promise<Payment | null> {
        return prisma.payment.findUnique({
            where: { id }
        });
    }

    async update(id: number, paymentData: Partial<Payment>): Promise<Payment | null> {
        return prisma.payment.update({
            where: { id },
            data: paymentData
        });
    }

    async delete(id: number): Promise<Payment | null> {
        return prisma.payment.delete({
            where: { id }
        });
    }
}