import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller';

const router = Router();
const profileController = new ProfileController();

router.post('/', profileController.create);
router.get('/', profileController.getAll);
router.get('/:id', profileController.getById);
router.put('/:id', profileController.update);
router.delete('/:id', profileController.delete);


export default router;