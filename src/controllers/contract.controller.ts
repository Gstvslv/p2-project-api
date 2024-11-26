import { Request, Response } from 'express';
import { ContractService } from '../services/contract.service';

const contractService = new ContractService();

export class ContractController {

    async create(req: Request, res: Response): Promise<void> {
        try {
            const contractData = req.body;
            const contract = await contractService.create(contractData);
            res.status(201).json(contract);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getByProfileId(req: Request, res: Response): Promise<void> {
        try {
            const profileId = parseInt(req.params.profileId);
            const contracts = await contractService.getContractsByProfileId(profileId);
            res.json(contracts);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const contract = await contractService.getContractById(id);
            res.json(contract);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const contractData = req.body;
            const updatedContract = await contractService.updateContract(id, contractData);
            res.json(updatedContract);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const deletedContract = await contractService.deleteContract(id);
            res.json(deletedContract);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }
}