import express from 'express';
import { 
    createChangePasswordController,
    createCheckChangePasswordTokenController,
    createConfirmUserController, 
    createCreateUserController,
    createForgotPasswordController, 
    createGetProfileController,
    createLoginController} 
from './Controllers/controllerFactory';
import { createCheckAuth } from './Middleware/middlewareFactory';

const router = express.Router();

const createUserController = createCreateUserController();
const confirmUserController = createConfirmUserController();
const forgotPasswordController = createForgotPasswordController();
const checkChangePasswordTokenController = createCheckChangePasswordTokenController();
const changePasswordController = createChangePasswordController();
const getProfileController = createGetProfileController();
const loginController = createLoginController();

// middleware
const checkAuth = createCheckAuth();

router.post('/users/create', createUserController.handle.bind(createUserController));
router.post('/users/confirm/:token', confirmUserController.handle.bind(confirmUserController));
router.post('/users/forgot-password', forgotPasswordController.handle.bind(forgotPasswordController));
router.post('/users/check-change-password-token/:token', checkChangePasswordTokenController.handle.bind(checkChangePasswordTokenController));
router.post('/users/change-password/:token', changePasswordController.handle.bind(changePasswordController));
router.get("/users/profile", checkAuth.checkAuth.bind(checkAuth), getProfileController.execute.bind(getProfileController));
router.post("/users/login", loginController.execute.bind(loginController));

export default router;  
