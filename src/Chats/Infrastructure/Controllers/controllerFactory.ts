import { GetChatUseCase } from "../../Application/getChatUseCase";
import { mongoDbChatRepository } from "../MongoDB/chatRepository";
import { GetChatController } from "./getChatController";

function createGetChatController() {
    const repository = new mongoDbChatRepository();
    const useCase = new GetChatUseCase(repository);
    return new GetChatController(useCase);
}

export { createGetChatController };