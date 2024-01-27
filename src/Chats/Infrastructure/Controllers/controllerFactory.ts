import { GetChatUseCase } from "../../Application/getChatUseCase";
import { GetChatsUseCase } from "../../Application/getChatsUseCase";
import { mongoDbChatRepository } from "../Repositories/MongoDB/chatRepository";
import { GetChatController } from "./getChatController";
import { GetChatsController } from "./getChatsController";
import { CreateChatController } from "./createChatController";
import { CreateChatUseCase } from "../../Application/createChatUseCase";
import { UpdateMessageStatusUseCase } from "../../Application/updateMessageStatusUseCase";
import { UpdateMessageStatusController } from "./updateMessageStatusController";
import { SendMessageUseCase } from "../../Application/sendMessageUseCase";
import { SendMessageController } from "./sendMessageController";

function createGetChatController() {
    const repository = new mongoDbChatRepository();
    const useCase = new GetChatUseCase(repository);
    return new GetChatController(useCase);
}

function createGetChatsController() {
    const repository = new mongoDbChatRepository();
    const useCase = new GetChatsUseCase(repository);
    return new GetChatsController(useCase);
}

function createCreateChatController() {
    const repository = new mongoDbChatRepository();
    const useCase = new CreateChatUseCase(repository);
    return new CreateChatController(useCase);
}

function createUpdateMessageStatusController() {
    const repository = new mongoDbChatRepository();
    const useCase = new UpdateMessageStatusUseCase(repository);
    return new UpdateMessageStatusController(useCase);
}

function createSendMessageController() {
    const repository = new mongoDbChatRepository();
    const useCase = new SendMessageUseCase(repository);
    return new SendMessageController(useCase);
}

export { 
    createGetChatController, 
    createGetChatsController, 
    createCreateChatController, 
    createUpdateMessageStatusController,
    createSendMessageController
};