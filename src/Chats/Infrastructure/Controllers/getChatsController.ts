import { IGetChatsUseCase } from "../../Application/getChatsUseCase";
import { Request, Response } from "express";

export interface IGetChatsController {
    execute(req: Request, res: Response): Promise<void>;
}

export class GetChatsController {
    constructor(private getChatUseCase: IGetChatsUseCase) {}

    async execute(req: Request, res: Response) {
        try{
            const userId = req.params.userId;
            const chats = await this.getChatUseCase.execute(userId);
            res.status(200).json(chats);
        }
        catch(error){
            res.status(400).json({error: error.message});
        }
    }
}