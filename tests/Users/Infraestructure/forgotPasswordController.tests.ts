import { getMockReq, getMockRes } from "@jest-mock/express";
import { IForgotPasswordUseCase } from "../../../src/Users/Application/forgotPasswordUseCase";
import { ForgotPasswordController, IForgotPasswordController } from "../../../src/Users/Infraestructure/Controllers/forgotPasswordController";
import { forgotPasswordUseCaseMock } from "../Application/mocks/forgotPasswordUseCaseMock";

describe("forgot Password Controller", () => {

    let forgotPasswordUseCase : IForgotPasswordUseCase;
    let forgotPasswordController : IForgotPasswordController;

    beforeEach(() => {
        forgotPasswordUseCase = forgotPasswordUseCaseMock;
        forgotPasswordController = new ForgotPasswordController(forgotPasswordUseCase);
    });

    it("sends an email to the user", async () => {
        const email = "roberto@prueba.com";
        const req = getMockReq({email: email });
        const { res } = getMockRes();

        await forgotPasswordController.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(200);   
        expect(res.json).toHaveBeenCalledWith({message: "Password reset email sent"});
    });
});