import { getMockReq, getMockRes } from "@jest-mock/express";
import { ICreateChatUseCase } from "../../../src/Chats/Application/createChatUseCase";
import { createChatUseCaseMock } from "../Application/mock/createChatUseCaseMock";
import { Chat } from "../../../src/Chats/Domain/Entities/Chat";
import { User } from "../../../src/Chats/Domain/Entities/User";
import { CreateChatController, ICreateChatController } from "../../../src/Chats/Infrastructure/Controllers/createChatController";

describe("createChat Controller", () => {

    let createChatUseCase : ICreateChatUseCase;
    let createChatController : ICreateChatController;

    beforeEach(() => {
        createChatUseCase = createChatUseCaseMock;
        createChatController = new CreateChatController(createChatUseCase);
    });

    it("creates a chat", async () => {
        const users = ["12345678", "87654321"];
        const user : User = {
            _id: "12345678",
            name: "",
            email: ""
        }
        const user2 : User = {
            _id: "87654321",
            name: "",
            email: ""
        }
        const chat = new Chat("12345678", [user, user2], [], false, "", new Date());
        const req = getMockReq({body: { users: users }});
        const { res } = getMockRes();
        createChatUseCase.execute = jest.fn().mockReturnValue(chat);

        await createChatController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(chat);
    });

    it("creates a group chat if more than 2 users are provided", async () => {
        const users = ["12345678", "87654321", "12312312"];
        
        const user1 : User = { _id: "12345678", name: "", email: ""}
        const user2 : User = { _id: "87654321", name: "", email: ""}
        const user3 : User = { _id: "12312312", name: "", email: ""}

        const chat = new Chat("12345678", [user1, user2, user3], [], true, "", new Date());
        const req = getMockReq({body: { name: "group name",  users: users }});
        const { res } = getMockRes();
        createChatUseCase.execute = jest.fn().mockReturnValue(chat);

        await createChatController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(chat);
    });

});