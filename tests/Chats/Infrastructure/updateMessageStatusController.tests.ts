import { getMockReq, getMockRes } from "@jest-mock/express";
import { IUpdateMessageStatusUseCase } from "../../../src/Chats/Application/updateMessageStatusUseCase";
import { updateMessageStatusUseCaseMock } from "../Application/mock/updateMessageStatusUseCaseMock";
import { Request, Response } from "express";

describe("updateMessageStatus Controller", () => {

    let updateMessageStatusUseCase : IUpdateMessageStatusUseCase;
    let updateMessageStatusController : UpdateMessageStatusController;

    beforeEach(() => {
        updateMessageStatusUseCase = updateMessageStatusUseCaseMock;
        updateMessageStatusController = new UpdateMessageStatusController(updateMessageStatusUseCase);
    });

    it("updates message status", async () => {
        const messageId = "12345678";
        const chatId = "123";
        const req = getMockReq({body: { chatId: chatId, messageId: messageId }});
        const { res } = getMockRes();
        updateMessageStatusUseCase.execute = jest.fn().mockReturnValue("Messages status updated");

        await updateMessageStatusController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith("Messages status updated");
    });

    it("throws an error if chatId is empty", async () => {
        const messageId = "12345678";
        const chatId = "";
        const req = getMockReq({body: { chatId: chatId, messageId: messageId }});
        const { res } = getMockRes();
        updateMessageStatusUseCase.execute = jest.fn().mockRejectedValue(new Error('ChatId is required'));

        await updateMessageStatusController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: "ChatId is required"});
    });
});

export interface IUpdateMessageStatusController {
    execute(req: Request, res: Response): Promise<void>;
}

export class UpdateMessageStatusController implements IUpdateMessageStatusController {
    constructor(private updateMessageStatusUseCase: IUpdateMessageStatusUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        const { chatId, messageId } = req.body;
        try {
            const result = await this.updateMessageStatusUseCase.execute(chatId, messageId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}