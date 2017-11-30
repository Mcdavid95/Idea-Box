import express from 'express';
import validateInput from '../utils/validateInput';
import userController from '../controllers/userControllers';

const router = express.Router();
router.post('/api/v1/user/signup', validateInput.signupInput, userController.signup);

export default router;

