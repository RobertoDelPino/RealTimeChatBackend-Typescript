import express from 'express';
import { createGetAllUsersController } from './controllerFactory';

const router = express.Router();

const getAllUsersController = createGetAllUsersController();

router.get('/users', getAllUsersController.exec);

/*router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);*/

export default router;
