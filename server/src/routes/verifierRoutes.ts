import express from 'express';
import { getLoans,updateLoanStatus} from '../controllers/verifierController';
import { authenticate, authorizeRole } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/loan',authenticate, authorizeRole(['verifier']), getLoans);
router.patch('/loan/status',authenticate, authorizeRole(['verifier']), updateLoanStatus);
export default router;
