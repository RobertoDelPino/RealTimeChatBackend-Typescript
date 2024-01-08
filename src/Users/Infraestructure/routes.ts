import express from 'express';
import { createConfirmUserController, createCreateUserController } from './Controllers/controllerFactory';

const router = express.Router();

const createUserController = createCreateUserController();
const confirmUserController = createConfirmUserController();

router.post('/users/create', createUserController.handle.bind(createUserController));
router.post('/users/confirm/:token', confirmUserController.handle.bind(confirmUserController));

/*router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);*/

export default router;
