import { Router } from 'express';
import { productController } from '../controllers/productController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Todas las rutas de productos requieren autenticación
router.use(authMiddleware);

router.post('/', productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

export default router;
