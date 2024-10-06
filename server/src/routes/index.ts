import express from 'express';
import authRoute from './authRoutes';
import userRoute from './userRoutes';
import verifierRoute from './verifierRoutes';
import adminRoute from './adminRoutes';
const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/verifier', verifierRoute);
router.use('/admin', adminRoute);

export default router;
