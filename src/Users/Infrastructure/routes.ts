import express from 'express';
import { 
    createChangePasswordController,
    createCheckChangePasswordTokenController,
    createConfirmUserController, 
    createCreateUserController,
    createForgotPasswordController, 
    createGetProfileController,
    createLoginController,
    createGetProfilePhotoController,
    createUpdateUserProfileController} 
from './Controllers/controllerFactory';
import { createCheckAuth } from './Middleware/middlewareFactory';
import multer from 'multer';
const router = express.Router();

const createUserController = createCreateUserController();
const confirmUserController = createConfirmUserController();
const forgotPasswordController = createForgotPasswordController();
const checkChangePasswordTokenController = createCheckChangePasswordTokenController();
const changePasswordController = createChangePasswordController();
const getProfileController = createGetProfileController();
const loginController = createLoginController();
const getProfilePhotoController = createGetProfilePhotoController();
const updateUserProfileController = createUpdateUserProfileController();

// middleware
const checkAuth = createCheckAuth();
const upload = multer({
    storage: multer.memoryStorage()
});

router.post('/api/users/create', createUserController.handle.bind(createUserController));
router.post('/api/users/confirm/:token', confirmUserController.handle.bind(confirmUserController));
router.post('/api/users/forgot-password', forgotPasswordController.handle.bind(forgotPasswordController));
router.post('/api/users/check-change-password-token/:token', checkChangePasswordTokenController.handle.bind(checkChangePasswordTokenController));
router.post('/api/users/change-password/:token', changePasswordController.handle.bind(changePasswordController));
router.get("/api/users/profile", checkAuth.checkAuth.bind(checkAuth), getProfileController.execute.bind(getProfileController));
router.post("/api/users/login", loginController.execute.bind(loginController));
router.get("/api/users/profile-photo/:id", checkAuth.checkAuth.bind(checkAuth), getProfilePhotoController.execute.bind(getProfilePhotoController));
router.post("/api/users/profile", checkAuth.checkAuth.bind(checkAuth), upload.any(),  updateUserProfileController.execute.bind(updateUserProfileController));

export default router;  
