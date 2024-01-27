import { getMockReq, getMockRes } from "@jest-mock/express";
import { IUpdateMessageStatusUseCase } from "../../../src/Chats/Application/updateMessageStatusUseCase";
import { updateMessageStatusUseCaseMock } from "../Application/mock/updateMessageStatusUseCaseMock";
import { IUpdateMessageStatusController, UpdateMessageStatusController } from "../../../src/Chats/Infrastructure/Controllers/updateMessageStatusController";

describe("updateMessageStatus Controller", () => {

    let updateMessageStatusUseCase : IUpdateMessageStatusUseCase;
    let updateMessageStatusController : IUpdateMessageStatusController;

    beforeEach(() => {
        updateMessageStatusUseCase = updateMessageStatusUseCaseMock;
        updateMessageStatusController = new UpdateMessageStatusController(updateMessageStatusUseCase);
    });

    it("updates message status", async () => {
        const userId = "12345678";
        const chatId = "123";
        const req = getMockReq({body: { chatId: chatId, userId: userId }});
        const { res } = getMockRes();
        updateMessageStatusUseCase.execute = jest.fn().mockReturnValue("Messages status updated");

        await updateMessageStatusController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith("Messages status updated");
    });

    it("throws an error if chatId is empty", async () => {
        const userId = "12345678";
        const chatId = "";
        const req = getMockReq({body: { chatId: chatId, userId: userId }});
        const { res } = getMockRes();

        await updateMessageStatusController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: "ChatId is required"});
    });

    it("throws an error if userId is empty", async () => {
        const userId = "";
        const chatId = "123";
        const req = getMockReq({body: { chatId: chatId, userId: userId }});
        const { res } = getMockRes();

        await updateMessageStatusController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: "UserId is required"});
    });
});