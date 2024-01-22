import { getMockReq, getMockRes } from "@jest-mock/express";
import { ICreateUserUseCase } from "../../../src/Users/Application/createUserUseCase"
import { CreateUserController, ICreateUserController } from "../../../src/Users/Infrastructure/Controllers/createUserController";
import { createUserUseCaseMock } from "../Application/mocks/createUserUseCaseMock";

describe("create User Controller", () => {

    let createUserUseCase : ICreateUserUseCase;
    let createUserController : ICreateUserController;

    beforeEach(() => {
        createUserUseCase = createUserUseCaseMock;
        createUserController = new CreateUserController(createUserUseCase);
    });

    it("creates a user", async () => {
        const name = "Roberto";
        const email = "roberto@prueba.com";
        const password = "12345678";
        const req = getMockReq({name: name, email: email, password: password });
        const { res } = getMockRes();

        await createUserController.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
    });

    it("throws an error if useCase fails", async () => {
        const req = getMockReq();
        const { res } = getMockRes();
        createUserUseCase.execute = jest.fn().mockRejectedValue(new Error('User not found'));

        await createUserController.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: "User not found"});
    });
});