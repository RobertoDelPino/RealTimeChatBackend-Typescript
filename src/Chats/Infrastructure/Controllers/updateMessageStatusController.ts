import { Request, Response } from "express";
import { IUpdateMessageStatusUseCase } from "../../Application/updateMessageStatusUseCase";

export interface IUpdateMessageStatusController {
    execute(req: Request, res: Response): Promise<void>;
}

export class UpdateMessageStatusController implements IUpdateMessageStatusController {
    constructor(private updateMessageStatusUseCase: IUpdateMessageStatusUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { chatId, userId } = req.body;
            if(!chatId) throw new Error("ChatId is required");
            if(!userId) throw new Error("UserId is required");

            const result = await this.updateMessageStatusUseCase.execute(chatId, userId);
            
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}