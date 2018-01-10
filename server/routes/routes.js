import express from 'express';
import validateInput from '../utils/validateInput';
import userController from '../controllers/userControllers';
import ideaController from '../controllers/ideaControllers';
import commentController from '../controllers/commentControllers';
import jwtVerify from '../utils/jwtVerify';

const router = express.Router();
// ========= User Routes ========

// signup route
router.post('/user/signup', validateInput.signupInput, userController.signup);

// signin route
router.post('/user/signin', validateInput.signInInput, userController.signin);

// forgot password route
router.post('/user/reset', userController.forgotPassoword);

// reset password
router.put('/user/reset/:token', userController.reset);

// get user profile
router.get('/user/info', jwtVerify.hasToken, userController.getUserDetails);

// update user profile
router.put('/user/update', jwtVerify.hasToken, userController.updateUser);

// ========= Idea Routes =========

// create idea
router.post('/idea', jwtVerify.hasToken, validateInput.ideaInput, ideaController.createIdea);

// get public ideas
router.get('/ideas', jwtVerify.hasToken, ideaController.getAllIdeas);

// get public ideas by catagory
router.get('/ideas/category', jwtVerify.hasToken, ideaController.getByCategory);

// get one idea
router.get('/idea', ideaController.getOneIdea);

// edit idea
router.get('/idea/:id', jwtVerify.hasToken, ideaController.editIdea);

// update idea
router.put('/idea', jwtVerify.hasToken, validateInput.updateIdea, ideaController.updateIdea);

// delete idea
router.delete('/idea', jwtVerify.hasToken, ideaController.deleteIdea);

// get user ideas
router.get('/user/ideas', jwtVerify.hasToken, ideaController.getUserIdeas);

// search ideas
router.post('/ideas/search', jwtVerify.hasToken, ideaController.searchIdeas);


// ========= Idea Routes =========


// post comments
router.post('/idea/:id/comment', jwtVerify.hasToken, validateInput.createComment, commentController.createComment);

// get comments
router.get('/idea/:id/comment', jwtVerify.hasToken, commentController.getComments);

export default router;

