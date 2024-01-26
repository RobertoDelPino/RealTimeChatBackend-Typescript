import { ICreateChatUseCase } from "../../Application/createChatUseCase";

export interface ICreateChatController {
    execute(req: any, res: any): Promise<void>
}

export class CreateChatController implements ICreateChatController {
    constructor(private createChatUseCase: ICreateChatUseCase) {}

    async execute(req: any, res: any): Promise<void> {
        const users = req.body.users;
        const chat = await this.createChatUseCase.execute(users);
        res.status(200).json(chat);
    }
}
