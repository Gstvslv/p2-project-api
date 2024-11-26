import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';

const router = Router();
const paymentController = new PaymentController();

router.post('/', paymentController.create);
router.get('/job/:jobId', paymentController.getByJobId);
router.get('/:id', paymentController.getById);
router.put('/:id', paymentController.update);
router.delete('/:id', paymentController.delete);

export default router;