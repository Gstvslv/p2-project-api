import { Request, Response } from 'express';
import { ProfileService } from "../services/profile.service";

const profileService = new ProfileService();

export class ProfileController {

    async create(req: Request, res: Response): Promise<void> {
        try {
            const profile = await profileService.create(req.body);
            res.status(201).json(profile);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const profiles = await profileService.getAll();
            res.json(profiles);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const profile = await profileService.getById(id);
            res.json(profile);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const profile = await profileService.update(id, req.body);
            res.json(profile);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const profile = await profileService.delete(id);

            if (!profile) {
                res.status(404).json({ error: `Profile with ID ${id} not found` });
                return;
            }
            res.status(200).json({
                message: `Profile with ID ${id} was successfully deleted`,
                deletedProfile: profile
            });
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }
}