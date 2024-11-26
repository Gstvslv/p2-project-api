import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';

const paymentService = new PaymentService();

export class PaymentController {

    async create(req: Request, res: Response): Promise<void> {
        try {
            const paymentData = req.body;
            const payment = await paymentService.create(paymentData);
            res.status(201).json(payment);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getByJobId(req: Request, res: Response): Promise<void> {
        try {
            const jobId = parseInt(req.params.jobId);
            const payments = await paymentService.getPaymentsByJobId(jobId);
            res.json(payments);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const payment = await paymentService.getPaymentById(id);
            res.json(payment);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const paymentData = req.body;
            const updatedPayment = await paymentService.updatePayment(id, paymentData);
            res.json(updatedPayment);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const deletedPayment = await paymentService.deletePayment(id);
            res.json(deletedPayment);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }
}