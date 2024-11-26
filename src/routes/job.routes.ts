import { Router } from 'express';
import { JobController } from '../controllers/job.controller';

const router = Router();
const jobController = new JobController();


router.post('/', jobController.create);
router.get('/:contractId', jobController.getJobsByContractId);
router.get('/:contractId/unpaid', jobController.getUnpaidJobs);
router.get('/job/:id', jobController.getJobById);
router.put('/job/:id', jobController.update);
router.delete('/job/:id', jobController.delete);

export default router;