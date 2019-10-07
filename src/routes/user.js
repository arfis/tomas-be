import express from 'express';
import validate from 'express-validation';
import userValidation from '../validators/validators';
import UserController from '../controllers/user.controller';
import {authLocal} from '../services/auth.service';

const router = new express.Router();
router.post('/signup', validate(userValidation.signup), UserController.signUp);
router.post('/login', authLocal, UserController.login);

export default router;
