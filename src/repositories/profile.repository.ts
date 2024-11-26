import { prisma } from '../database/prisma-client';
import { Profile } from '../interfaces/profile.interface';

export class ProfileRepository {
    async create(profileData: Omit<Profile, 'id'>): Promise<Profile> {
        return prisma.profile.create({
            data: profileData,
        });
    }

    async getAll(): Promise<Profile[]> {
        return prisma.profile.findMany();
    }

    async getById(id: number): Promise<Profile | null> {
        return prisma.profile.findUnique({ where: { id } })
    }

    async update(id: number, profileData: Partial<Omit<Profile, 'id'>>): Promise<Profile | null> {
        return prisma.profile.update({ where: { id }, data: profileData })
    }

    async delete(id: number): Promise<Profile> {
        return prisma.profile.delete({ where: { id } })
    }
}