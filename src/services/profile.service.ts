import { profile } from "console";
import { Profile } from "../interfaces/profile.interface";
import { ProfileRepository } from "../repositories/profile.repository";

const profileRepository = new ProfileRepository();

export class ProfileService {

    async create(data: Omit<Profile, 'id'>): Promise<Profile> {
        return profileRepository.create(data);
    }

    async getAll(): Promise<Profile[]> {
        return profileRepository.getAll();
    }

    async getById(id: number): Promise<Profile | null> {
        const profile = await profileRepository.getById(id);

        if (!profile) {
            throw new Error(`Profile with ID ${id} not found`);
        }
        return profile;
    }

    async update(id: number, data: Partial<Omit<Profile, 'id'>>): Promise<Profile | null> {
        const profile = await profileRepository.getById(id);

        if (!profile) {
            throw new Error(`Profile with ID ${id} not found`);
        }

        return profileRepository.update(id, data);
    }

    async delete(id: number): Promise<Profile | null> {
        const profile = await profileRepository.getById(id);

        if (!profile) {
            throw new Error(`Profile with ID ${id} not found`);
        }
        return profileRepository.delete(id);
    }
}