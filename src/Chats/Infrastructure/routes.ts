import express from 'express';
import { createCreateChatController, createGetChatController, createGetChatsController, createSendMessageController, createUpdateMessageStatusController } from './Controllers/controllerFactory';
import { createCheckAuth } from "./Middleware/middlewareFactory";

const router = express.Router();

const checkAuth = createCheckAuth();

const getChatController = createGetChatController();
const getChatsController = createGetChatsController();
const createChatController = createCreateChatController();
const updateMessageStatusController = createUpdateMessageStatusController();
const sendMessageController = createSendMessageController();

router.get('/api/chats/:chatId', checkAuth.checkAuth.bind(checkAuth) , getChatController.execute.bind(getChatController));
router.get('/api/chats',  checkAuth.checkAuth.bind(checkAuth), getChatsController.execute.bind(getChatsController));
router.post('/api/chats', checkAuth.checkAuth.bind(checkAuth), createChatController.execute.bind(createChatController));
router.post('/api/chat/update-status', checkAuth.checkAuth.bind(checkAuth), updateMessageStatusController.execute.bind(updateMessageStatusController));
router.post('/api/chat/send-message', checkAuth.checkAuth.bind(checkAuth), sendMessageController.execute.bind(sendMessageController));

export default router;