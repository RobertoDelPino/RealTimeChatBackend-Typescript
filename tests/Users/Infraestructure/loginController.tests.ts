import { getMockReq, getMockRes } from "@jest-mock/express";
import { ILoginUseCase } from "../../../src/Users/Application/loginUseCase";
import { ILoginController, LoginController } from "../../../src/Users/Infraestructure/Controllers/loginController";
import { loginUseCaseMock } from "../Application/mocks/loginUseCaseMock";

describe("login Controller", () => {

    let loginUseCase : ILoginUseCase;
    let loginController : ILoginController;

    beforeEach(() => {
        loginUseCase = loginUseCaseMock;
        loginController = new LoginController(loginUseCase);
    });

    it("logs in a user", async () => {
        const email = "roberto@prueba.com";
        const password = "12345678";
        const req = getMockReq({body: { email: email, password: password }});
        const { res } = getMockRes();

        await loginController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });

});