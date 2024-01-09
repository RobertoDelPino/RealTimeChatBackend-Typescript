import express from 'express';
import { 
    createConfirmUserController, 
    createCreateUserController,
    createForgotPasswordController } 
from './Controllers/controllerFactory';

const router = express.Router();

const createUserController = createCreateUserController();
const confirmUserController = createConfirmUserController();
const forgotPasswordController = createForgotPasswordController();

router.post('/users/create', createUserController.handle.bind(createUserController));
router.post('/users/confirm/:token', confirmUserController.handle.bind(confirmUserController));
router.post('/users/forgot-password', forgotPasswordController.handle.bind(forgotPasswordController));

export default router;
