import express from 'express';
import { handleUserSignup, handleLogin } from '../controllers/user.js';
const router = express.Router();

router.post('/', handleUserSignup)  // Public - signup doesn't need auth
router.post('/login', handleLogin)  // Public - login doesn't need auth

export default router