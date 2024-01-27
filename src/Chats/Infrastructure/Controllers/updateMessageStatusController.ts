import { Request, Response } from "express";
import { IUpdateMessageStatusUseCase } from "../../Application/updateMessageStatusUseCase";

export interface IUpdateMessageStatusController {
    execute(req: Request, res: Response): Promise<void>;
}

export class UpdateMessageStatusController implements IUpdateMessageStatusController {
    constructor(private updateMessageStatusUseCase: IUpdateMessageStatusUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        const { chatId, userId } = req.body;
        if(!chatId) res.status(400).json({error: "ChatId is required"});
        if(!userId) res.status(400).json({error: "UserId is required"});

        try {
            const result = await this.updateMessageStatusUseCase.execute(chatId, userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}