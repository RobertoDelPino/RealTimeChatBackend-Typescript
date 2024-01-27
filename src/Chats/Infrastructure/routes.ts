import express from 'express';
import { createCreateChatController, createGetChatController, createGetChatsController, createUpdateMessageStatusController } from './Controllers/controllerFactory';
import { createCheckAuth } from "./Middleware/middlewareFactory";

const router = express.Router();

const checkAuth = createCheckAuth();

const getChatController = createGetChatController();
const getChatsController = createGetChatsController();
const createChatController = createCreateChatController();
const updateMessageStatusController = createUpdateMessageStatusController();


router.get('/chats/:chatId', checkAuth.checkAuth.bind(checkAuth) , getChatController.execute.bind(getChatController));
router.get('/user/:userId/chats',  checkAuth.checkAuth.bind(checkAuth), getChatsController.execute.bind(getChatsController));
router.post('/chats', checkAuth.checkAuth.bind(checkAuth), createChatController.execute.bind(createChatController));
router.post('/chat/update-status', checkAuth.checkAuth.bind(checkAuth), updateMessageStatusController.execute.bind(updateMessageStatusController));

export default router;