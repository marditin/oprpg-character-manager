import { Router } from 'express';
import { characterController } from '../controllers/characterController.js';

const router = Router();

router.get('/', characterController.list);
router.get('/:id', characterController.findById);
router.post('/', characterController.create);
router.put('/:id', characterController.update);
router.delete('/:id', characterController.remove);

export default router;