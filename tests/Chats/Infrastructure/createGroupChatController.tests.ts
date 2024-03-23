import { getMockReq, getMockRes } from "@jest-mock/express";
import { Request, Response } from "express";
import { createGroupChatUseCaseMock } from "../Application/mock/createGroupChatUseCaseMock";
import { Chat } from "../../../src/Chats/Domain/Entities/Chat";
import { User } from "../../../src/Chats/Domain/Entities/User";

describe('createGroupChatController', () => {

    let createGroupChatController: ICreateGroupChatController;
    let createGroupChatUseCase: ICreateGroupChatUseCase;

    beforeEach(() => {
        createGroupChatUseCase = createGroupChatUseCaseMock;
        createGroupChatController = new CreateGroupChatController(createGroupChatUseCase);
    });

    /*
    Use cases:
    - Create a group chat
    - Add a user to a group chat
    - Remove a user from a group chat
    - Delete a group chat
    - Get all group chats
    - Get all group chats of a user
    - Get all users of a group chat
    - Get all messages of a group chat

    Cases of create a group chat:

    - The group chat is created successfully
    - The group chat is not created successfully
    - The group chat need to have at least one user
    - The group chat need to have a name
    */

    it('creates a group chat', async () => {
        const request = getMockReq({
            body: {
                name: 'Group chat name',
                users: ['user1', 'user2']
            }
        });
        const { res } = getMockRes();
        const chat = new Chat('12345678', [new User(request.body.users[0]), new User(request.body.users[1])], []);

        createGroupChatUseCase.execute = jest.fn().mockReturnValue(chat);
        await createGroupChatController.execute(request, res);

        expect(res.json).toHaveBeenCalledWith(chat);
    });


});

export interface ICreateGroupChatUseCaseProps {
    name: string;
    users: string[];
}

export interface ICreateGroupChatUseCase {
    execute(request: ICreateGroupChatUseCaseProps): Promise<void>;
}

export interface ICreateGroupChatController {
    execute(request: Request, response: Response): Promise<any>;
}

export class CreateGroupChatController implements ICreateGroupChatController {
    constructor(private createGroupChatUseCase: ICreateGroupChatUseCase) {}

    async execute(request: Request, response: Response) {
        try
        {
            const useCaseRequest = {
                name: request.body.name,
                users: request.body.users
            };
            const chat = await this.createGroupChatUseCase.execute(useCaseRequest);
            response.status(200).json(chat)
        }
        catch (error)
        {
            response.status(400).json({ message: error.message });
        }
    }
}