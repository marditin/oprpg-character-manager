import { Router } from 'express';
import { equipmentController } from '../controllers/equipmentController.js';

const router = Router();

router.get('/', equipmentController.list);
router.get('/:id', equipmentController.findById);
router.post('/', equipmentController.create);
router.put('/:id', equipmentController.update);
router.delete('/:id', equipmentController.remove);

export default router;