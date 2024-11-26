import { prisma } from "../database/prisma-client";
import { Prisma, Contract } from '@prisma/client';

export class ContractRepository {

    async create(contractData: Prisma.ContractCreateInput): Promise<Contract> {
        return prisma.contract.create({
            data: contractData,
        });
    }

    async getByProfileId(profileId: number): Promise<Contract[]> {
        return prisma.contract.findMany({
            where: {
                OR: [
                    { clientId: profileId },
                    { contractorId: profileId },
                ],
            },
        });
    }

    async getById(id: number): Promise<Contract | null> {
        return prisma.contract.findUnique({
            where: { id },
        });
    }

    async update(id: number, contractData: Partial<Contract>): Promise<Contract> {
        return prisma.contract.update({
            where: { id },
            data: contractData,
        });
    }

    async delete(id: number): Promise<Contract | null> {
        return prisma.contract.delete({
            where: { id },
        });
    }
}