import { GetChatUseCase } from "../../Application/getChatUseCase";
import { GetChatsUseCase } from "../../Application/getChatsUseCase";
import { mongoDbChatRepository } from "../Repositories/MongoDB/chatRepository";
import { GetChatController } from "./getChatController";
import { GetChatsController } from "./getChatsController";

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

export { createGetChatController, createGetChatsController };