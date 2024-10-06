import express from 'express';
import { getVerifiers } from '../controllers/adminController';
import { authenticate, authorizeRole } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/verifiers',authenticate, authorizeRole(['admin']), getVerifiers);

export default router;
