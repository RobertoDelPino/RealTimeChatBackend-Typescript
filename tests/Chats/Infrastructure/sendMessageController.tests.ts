import { getMockReq, getMockRes } from "@jest-mock/express";
import { sendMessageUseCaseMock } from "../Application/mock/sendMessageUseCaseMock"
import { ISendMessageUseCase } from "../../../src/Chats/Application/sendMessageUseCase";
import { Message } from "../../../src/Chats/Domain/Entities/Message";
import { User } from "../../../src/Chats/Domain/Entities/User";
import { ISendMessageController, SendMessageController } from "../../../src/Chats/Infrastructure/Controllers/sendMessageController";

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
        const req = getMockReq({body: { chatId: newMessage._id, sender: newMessage.sender, message: newMessage.message }});
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
        const req = getMockReq({body: { chatId: newMessage._id, sender: newMessage.sender, message: newMessage.message }});
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
        const req = getMockReq({body: { chatId: "", sender: newMessage.sender, message: newMessage.message }});
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
        const req = getMockReq({body: { chatId: newMessage._id, sender: "", message: newMessage.message }});
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