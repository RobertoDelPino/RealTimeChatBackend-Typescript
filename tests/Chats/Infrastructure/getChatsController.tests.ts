import { getMockReq, getMockRes } from "@jest-mock/express";
import { Chat } from "../../../src/Chats/Domain/Entities/Chat";
import { IGetChatsUseCase } from "../../../src/Chats/Application/getChatsUseCase";
import { getChatsUseCaseMock } from "../Application/mock/getChatsUseCaseMock";
import { GetChatsController, IGetChatsController } from "../../../src/Chats/Infrastructure/Controllers/getChatsController";

describe("getChats Controller", () => {

    let getChatUseCase : IGetChatsUseCase;
    let getChatController : IGetChatsController;

    beforeEach(() => {
        getChatUseCase = getChatsUseCaseMock;
        getChatController = new GetChatsController(getChatUseCase);
    });

    it("gets chat from user", async () => {
        const chats = [new Chat("12345678", [], [])];
        const userId = "12345678";
        const req = getMockReq({params: { userId: userId }});
        const { res } = getMockRes();
        getChatUseCase.execute = jest.fn().mockReturnValue(chats);

        await getChatController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(chats);
    });

    it("throws an error if userId is empty", async () => {
        const userId = "";
        const req = getMockReq({params: { userId: userId }});
        const { res } = getMockRes();
        getChatUseCase.execute = jest.fn().mockRejectedValue(new Error('userId is required'));

        await getChatController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: "userId is required"});
    });
});