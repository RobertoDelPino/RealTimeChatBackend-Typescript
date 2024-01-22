import express from 'express';
import { createGetChatController, createGetChatsController } from './Controllers/controllerFactory';

const router = express.Router();

const getChatController = createGetChatController();
const getChatsController = createGetChatsController();

router.get('/chats/:chatId', getChatController.execute.bind(getChatController));
router.get('/user/:userId/chats', getChatsController.execute.bind(getChatsController));

export default router;