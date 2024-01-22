import express from 'express';
import { createGetChatController } from './Controllers/controllerFactory';

const router = express.Router();

const getChatController = createGetChatController();

router.get('/chats/:chatId', getChatController.execute.bind(getChatController));

export default router;