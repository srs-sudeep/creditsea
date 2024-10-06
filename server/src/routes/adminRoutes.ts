import express from 'express';
import { getVerifiers ,getLoans,getUsers} from '../controllers/adminController';
import { authenticate, authorizeRole } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/verifiers',authenticate, authorizeRole(['admin']), getVerifiers);
router.get('/loans',authenticate, authorizeRole(['admin']), getLoans);
router.get('/users',authenticate, authorizeRole(['admin']), getUsers);
export default router;
