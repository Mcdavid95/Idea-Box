import express from 'express';
import validateInput from '../utils/validateInput';
import userController from '../controllers/userControllers';
import ideaController from '../controllers/ideaControllers';
import jwtVerify from '../utils/jwtVerify';

const router = express.Router();
// ========= User Routes ========

// signup route
router.post('/api/v1/user/signup', validateInput.signupInput, userController.signup);

// signin route
router.post('/api/v1/user/signin', validateInput.signInInput, userController.signin);

// forgot password route
router.post('/api/v1/user/reset', userController.forgotPassoword);

// reset password
router.put('/api/v1/user/reset/:token', userController.reset);

// ========= Idea Routes =========

// create idea
router.post('/api/v1/idea', jwtVerify.hasToken, validateInput.ideaInput, ideaController.createIdea);

export default router;

