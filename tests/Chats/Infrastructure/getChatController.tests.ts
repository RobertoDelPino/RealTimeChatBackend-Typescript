import { getMockReq, getMockRes } from "@jest-mock/express";
import { IGetChatUseCase } from "../../../src/Chats/Application/getChatUseCase";
import { getChatUseCaseMock } from "../Application/mock/getChatUseCaseMock";
import { Chat } from "../../../src/Chats/Domain/temporalObjects/Chat";
import { Request, Response } from "express";

describe("getChat Controller", () => {

    let getChatUseCase : IGetChatUseCase;
    let getChatController : IGetChatController;

    beforeEach(() => {
        getChatUseCase = getChatUseCaseMock;
        getChatController = new GetChatController(getChatUseCase);
    });

    it("gets a chat", async () => {
        const chat = new Chat("12345678", [], []);
        const chatId = "12345678";
        const req = getMockReq({params: { chatId: chatId }});
        const { res } = getMockRes();

        getChatUseCase.execute = jest.fn().mockReturnValue(chat);

        await getChatController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(chat);
    });

    it("throws an error if chatId is empty", async () => {
        const chatId = "";
        const req = getMockReq({params: { chatId: chatId }});
        const { res } = getMockRes();

        getChatUseCase.execute = jest.fn().mockRejectedValue(new Error('ChatId is required'));

        await getChatController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: "ChatId is required"});
    });
});

export interface IGetChatController {
    execute(req: Request, res: Response): Promise<void>;
}

export class GetChatController {
    constructor(private getChatUseCase: IGetChatUseCase) {}

    async execute(req: Request, res: Response) {
        try{
            const chatId = req.params.chatId;
            const chat = await this.getChatUseCase.execute(chatId);
            res.status(200).json(chat);
        }
        catch(error){
            res.status(400).json({error: error.message});
        }
    }
}