import express from 'express';
import { createGetChatController, createGetChatsController } from './Controllers/controllerFactory';
import { createCheckAuth } from "./Middleware/middlewareFactory";

const router = express.Router();

const checkAuth = createCheckAuth();

const getChatController = createGetChatController();
const getChatsController = createGetChatsController();


router.get('/chats/:chatId', checkAuth.checkAuth.bind(checkAuth) , getChatController.execute.bind(getChatController));
router.get('/user/:userId/chats',  checkAuth.checkAuth.bind(checkAuth), getChatsController.execute.bind(getChatsController));

export default router;