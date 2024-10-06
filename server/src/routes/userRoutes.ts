import express from 'express';
import { createLoan,getLoans } from '../controllers/userController';
import { authenticate, authorizeRole } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/loan',authenticate, authorizeRole(['user']), createLoan);
router.get('/loan',authenticate, authorizeRole(['user']), getLoans);
export default router;
