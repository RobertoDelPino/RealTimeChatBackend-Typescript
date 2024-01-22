import { getMockReq, getMockRes } from "@jest-mock/express";
import { IConfirmUserUseCase } from "../../../src/Users/Application/confirmUserUseCase";
import { ConfirmUserController, IConfirmUserController } from "../../../src/Users/Infrastructure/Controllers/confirmUserController";
import { confirmUserUseCaseMock } from "../Application/mocks/confirmUserUseCaseMock";

describe("confirm User Controller", () => {

    let confirmUserUseCase : IConfirmUserUseCase;
    let confirmUserController : IConfirmUserController;

    beforeEach(() => {
        confirmUserUseCase = confirmUserUseCaseMock;
        confirmUserController = new ConfirmUserController(confirmUserUseCase);
    });

    it("confirms a user", async () => {
        const token = "token";
        const req = getMockReq({token: token });
        const { res } = getMockRes();

        await confirmUserController.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(201)    
    });

    it("throws an error if useCase fails", async () => {
        const req = getMockReq();
        const { res } = getMockRes();
        confirmUserUseCase.execute = jest.fn().mockRejectedValue(new Error('User not found'));

        await confirmUserController.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: "User not found"});
    });
});