import { Request, Response } from "express";
import { ICreateChatUseCase } from "../../Application/createChatUseCase";

export interface ICreateChatController {
    execute(req: Request, res: Response): Promise<void>
}

export class CreateChatController implements ICreateChatController {
    constructor(private createChatUseCase: ICreateChatUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        const { users, chatName } : ICreateChatRequest = req.body;
        const chat = await this.createChatUseCase.execute(users, chatName);

        res.status(200).json(chat);
    }
}

export interface ICreateChatRequest { users: string[]; chatName?: string; }

