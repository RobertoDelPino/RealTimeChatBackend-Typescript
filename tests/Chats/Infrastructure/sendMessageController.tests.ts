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
        const req = getMockReq({body: { chatId: newMessage._id, sender: newMessage.sender, message: newMessage.content }});
        const { res } = getMockRes();
        sendMessageUseCase.execute = jest.fn().mockReturnValue(newMessage);

        await sendMessageController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(newMessage);
    });

    it("throws an error if chat does not exists", async () => {
        const newMessage = new Message(
            "messageId",
            "content of the message",
            new User("userId", "userName", "userEmail"),
            new Date(),
            false
        );
        const req = getMockReq({body: { chatId: newMessage._id, sender: newMessage.sender, message: newMessage.content }});
        const { res } = getMockRes();
        sendMessageUseCase.execute = jest.fn().mockImplementation(() => {
            throw new Error("Chat does not exists");
        });

        await sendMessageController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: "Chat does not exists"});
    });

    it("throws an error if chatId is empty", async () => {
        const newMessage = new Message(
            "messageId",
            "content of the message",
            new User("userId", "userName", "userEmail"),
            new Date(),
            false
        );
        const req = getMockReq({body: { chatId: "", sender: newMessage.sender, message: newMessage.content }});
        const { res } = getMockRes();

        await sendMessageController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: "ChatId is required"});
    });

    it("throws an error if senderId is empty", async () => {
        const newMessage = new Message(
            "messageId",
            "content of the message",
            new User("userId", "userName", "userEmail"),
            new Date(),
            false
        );
        const req = getMockReq({body: { chatId: newMessage._id, sender: "", message: newMessage.content }});
        const { res } = getMockRes();

        await sendMessageController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: "SenderId is required"});
    });

    it("throws an error if Message is empty", async () => {
        const newMessage = new Message(
            "messageId",
            "content of the message",
            new User("userId", "userName", "userEmail"),
            new Date(),
            false
        );
        const req = getMockReq({body: { chatId: newMessage._id, sender: newMessage.sender, message: "" }});
        const { res } = getMockRes();

        await sendMessageController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: "Message is required"});
    });
});

export interface ISendMessageController {
    execute(req: Request, res: Response): Promise<void>;
}

export class SendMessageController implements ISendMessageController {

    constructor(private sendMessageUseCase: ISendMessageUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try{
            const { chatId, message, sender } = req.body;

            if(!chatId){
                throw new Error("ChatId is required");
            }

            if(!message){
                throw new Error("Message is required");
            }

            if(!sender){
                throw new Error("SenderId is required");
            }

            const newMessage = new Message(
                "",
                message,
                new User(sender, "", ""),
                new Date(),
                false
            );
    
            const result = await this.sendMessageUseCase.execute(chatId, newMessage);
            res.status(200).json(result);
        }catch(error){
            res.status(400).json({error: error.message});
        }
    }
}