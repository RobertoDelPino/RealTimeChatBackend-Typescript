import { getMockReq, getMockRes } from "@jest-mock/express";
import { sendMessageUseCaseMock } from "../Application/mock/sendMessageUseCaseMock"
import { ISendMessageUseCase } from "../../../src/Chats/Application/sendMessageUseCase";
import { Request, Response } from "express";
import { Message } from "../../../src/Chats/Domain/Entities/Message";
import { User } from "../../../src/Chats/Domain/Entities/User";

describe('sendMessageController', () => {

    let sendMessageController: ISendMessageController;
    let sendMessageUseCase: ISendMessageUseCase;

    beforeEach(() => {
        sendMessageUseCase = sendMessageUseCaseMock;
        sendMessageController = new SendMessageController(sendMessageUseCase);
    });

    it("creates a message", async () => {
        const newMessage = new Message(
            "messageId",
            "content of the message",
            new User("userId", "userName", "userEmail"),
            new Date(),
            false
        );
        const userId = "";
        const chatId = "123";
        const message = "message";
        const req = getMockReq({body: { chatId: chatId, sender: userId, message: message }});
        const { res } = getMockRes();
        sendMessageUseCase.execute = jest.fn().mockReturnValue(newMessage);

        await sendMessageController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(newMessage);
    });
});

export interface ISendMessageController {
    execute(req: Request, res: Response): Promise<void>;
}

export class SendMessageController implements ISendMessageController {

    constructor(private sendMessageUseCase: ISendMessageUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        const { chatId, message, sender } = req.body;

        const newMessage = new Message(
            "",
            message,
            new User(sender, "", ""),
            new Date(),
            false
        );

        const result = await this.sendMessageUseCase.execute(chatId, newMessage);
        res.status(200).json(result);
    }

}