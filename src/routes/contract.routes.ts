import { Router } from 'express';
import { ContractController } from '../controllers/contract.controller';

const router = Router();
const contractController = new ContractController();

router.post('/', contractController.create);
router.get('/:profileId', contractController.getByProfileId);
router.get('/contract/:id', contractController.getById);
router.put('/contract/:id', contractController.update);
router.delete('/contract/:id', contractController.delete);

export default router;