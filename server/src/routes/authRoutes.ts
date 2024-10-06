import express from 'express';
import { registerUser, registerVerifier, login } from '../controllers/authController';
import { authenticate, authorizeRole } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.post('/register-verifier', authenticate, authorizeRole(['admin']), registerVerifier);

export default router;
