import { Router } from 'express';
import { DepositController } from '../controllers/deposit.controller';

const router = Router();
const depositController = new DepositController();

router.get('/', depositController.getAll);
router.get('/:id', depositController.getById);
router.get('/profile/:profileId', depositController.getByProfileId);
router.post('/profile/:profileId', depositController.makeDeposit);

export default router;