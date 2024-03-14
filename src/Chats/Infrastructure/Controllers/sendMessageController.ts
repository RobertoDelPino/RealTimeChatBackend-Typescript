import { Request, Response } from "express";
import { ISendMessageUseCase } from "../../Application/sendMessageUseCase";
import { Message } from "../../Domain/Entities/Message";
import { User } from "../../Domain/Entities/User";

export interface ISendMessageController {
    execute(req: Request, res: Response): Promise<void>;
}

export class SendMessageController implements ISendMessageController {

    constructor(private sendMessageUseCase: ISendMessageUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        try{
            const { chatId, message, sender } = req.body;

            if(!chatId) throw new Error("ChatId is required");
            if(!message) throw new Error("Message is required");
            if(!sender) throw new Error("SenderId is required");

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