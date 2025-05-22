import { Router } from 'express';
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';

const router = Router();

// Prefijos para cada dominio
router.use('/users', userRoutes);
router.use('/products', productRoutes);

export default router;
