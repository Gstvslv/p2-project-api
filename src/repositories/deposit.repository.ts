import { prisma } from '../database/prisma-client';
import { Deposit } from '../interfaces/deposit.interface';

export class DepositRepository {
    async create(clientId: number, depositValue: number): Promise<Deposit> {
        return prisma.deposit.create({
            data: {
                clientId,
                depositValue,
                operationDate: new Date(),
            },
        });
    }

    async getAll(): Promise<Deposit[]> {
        return prisma.deposit.findMany();
    }

    async getById(id: number): Promise<Deposit | null> {
        return prisma.deposit.findUnique({
            where: { id },
        });
    }

    async getByProfileId(profileId: number): Promise<Deposit[]> {
        return prisma.deposit.findMany({
            where: { clientId: profileId },
        });
    }
}