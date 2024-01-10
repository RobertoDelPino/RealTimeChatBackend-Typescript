import express from 'express';
import { 
    createChangePasswordController,
    createCheckChangePasswordTokenController,
    createConfirmUserController, 
    createCreateUserController,
    createForgotPasswordController } 
from './Controllers/controllerFactory';

const router = express.Router();

const createUserController = createCreateUserController();
const confirmUserController = createConfirmUserController();
const forgotPasswordController = createForgotPasswordController();
const checkChangePasswordTokenController = createCheckChangePasswordTokenController();
const changePasswordController = createChangePasswordController();

router.post('/users/create', createUserController.handle.bind(createUserController));
router.post('/users/confirm/:token', confirmUserController.handle.bind(confirmUserController));
router.post('/users/forgot-password', forgotPasswordController.handle.bind(forgotPasswordController));
router.post('/users/check-change-password-token/:token', checkChangePasswordTokenController.handle.bind(checkChangePasswordTokenController));
router.post('/users/change-password/:token', changePasswordController.handle.bind(changePasswordController));

export default router;
