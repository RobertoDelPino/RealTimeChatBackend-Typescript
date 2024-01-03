import express from 'express';
import { createCreateUserController } from './Controllers/controllerFactory';

const router = express.Router();

const createUserController = createCreateUserController();

router.post('/users/create', createUserController.handle.bind(createUserController));

/*router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);*/

export default router;
