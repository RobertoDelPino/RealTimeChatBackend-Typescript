import { IGetChatUseCase } from "../../Application/getChatUseCase";
import { Request, Response } from "express";

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