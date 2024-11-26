import { Request, Response } from 'express';
import { DepositService } from '../services/deposit.service';

const depositService = new DepositService();

export class DepositController {
    async makeDeposit(req: Request, res: Response): Promise<void> {
        try {
            const profileId = parseInt(req.params.profileId);
            const { depositValue } = req.body;

            if (!depositValue || depositValue <= 0) {
                throw new Error('Deposit value must be greater than 0');
            }

            const deposit = await depositService.makeDeposit(profileId, depositValue);
            res.status(201).json(deposit);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const deposits = await depositService.getAllDeposits();
            res.json(deposits);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const deposit = await depositService.getDepositById(id);
            res.json(deposit);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async getByProfileId(req: Request, res: Response): Promise<void> {
        try {
            const profileId = parseInt(req.params.profileId);
            const deposits = await depositService.getDepositsByProfileId(profileId);
            res.json(deposits);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }
}