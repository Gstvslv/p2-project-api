import { ContractRepository } from "../repositories/contract.repository";
import { Prisma, Contract } from '@prisma/client';

const contractRepo = new ContractRepository();

export class ContractService {

    // Usando Prisma.ContractCreateInput para garantir que o id não será passado
    async create(contractData: Prisma.ContractCreateInput): Promise<Contract> {
        return contractRepo.create(contractData);
    }

    async getContractsByProfileId(profileId: number): Promise<Contract[]> {
        return contractRepo.getByProfileId(profileId);
    }

    async getContractById(id: number): Promise<Contract | null> {
        const contract = await contractRepo.getById(id);
        if (!contract) {
            throw new Error(`Contract with ID ${id} not found`);
        }
        return contract;
    }

    async updateContract(id: number, contractData: Partial<Contract>): Promise<Contract> {
        const updatedContract = await contractRepo.update(id, contractData);
        if (!updatedContract) {
            throw new Error(`Contract with ID ${id} not found`);
        }
        return updatedContract;
    }

    async deleteContract(id: number): Promise<Contract | null> {
        const deletedContract = await contractRepo.delete(id);
        if (!deletedContract) {
            throw new Error(`Contract with ID ${id} not found`);
        }
        return deletedContract;
    }
}