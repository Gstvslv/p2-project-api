import { DepositRepository } from '../repositories/deposit.repository';
import { ProfileRepository } from '../repositories/profile.repository';
import { Deposit } from '../interfaces/deposit.interface';

const depositRepo = new DepositRepository();
const profileRepo = new ProfileRepository();

export class DepositService {
    async makeDeposit(profileId: number, depositValue: number): Promise<Deposit> {
        const profile = await profileRepo.getById(profileId);

        if (!profile) {
            throw new Error(`Profile with ID ${profileId} not found`);
        }
        await profileRepo.update(profileId, { balance: profile.balance + depositValue });
        const deposit = await depositRepo.create(profileId, depositValue);

        return deposit;
    }

    async getAllDeposits(): Promise<Deposit[]> {
        return depositRepo.getAll();
    }

    async getDepositById(id: number): Promise<Deposit | null> {
        const deposit = await depositRepo.getById(id);

        if (!deposit) {
            throw new Error(`Deposit with ID ${id} not found`);
        }

        return deposit;
    }

    async getDepositsByProfileId(profileId: number): Promise<Deposit[]> {
        return depositRepo.getByProfileId(profileId);
    }
}