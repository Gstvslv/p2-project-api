import { PaymentRepository } from '../repositories/payment.repository';
import { Payment } from '@prisma/client';

const paymentRepo = new PaymentRepository();

export class PaymentService {

    async create(paymentData: Payment): Promise<Payment> {
        return paymentRepo.create(paymentData);
    }

    async getPaymentsByJobId(jobId: number): Promise<Payment[]> {
        return paymentRepo.getByJobId(jobId);
    }

    async getPaymentById(id: number): Promise<Payment | null> {
        const payment = await paymentRepo.getById(id);
        if (!payment) {
            throw new Error(`Payment with ID ${id} not found`);
        }
        return payment;
    }

    async updatePayment(id: number, paymentData: Partial<Payment>): Promise<Payment | null> {
        const updatedPayment = await paymentRepo.update(id, paymentData);
        if (!updatedPayment) {
            throw new Error(`Payment with ID ${id} not found`);
        }
        return updatedPayment;
    }

    async deletePayment(id: number): Promise<Payment | null> {
        const deletedPayment = await paymentRepo.delete(id);
        if (!deletedPayment) {
            throw new Error(`Payment with ID ${id} not found`);
        }
        return deletedPayment;
    }
}