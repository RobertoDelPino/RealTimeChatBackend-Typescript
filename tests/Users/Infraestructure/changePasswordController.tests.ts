import { getMockReq, getMockRes } from "@jest-mock/express";
import { IChangePasswordUseCase } from "../../../src/Users/Application/changePasswordUseCase";
import { IChangePasswordController, ChangePasswordController } from "../../../src/Users/Infraestructure/Controllers/changePasswordController";
import { changePasswordUseCaseMock } from "../Application/mocks/changePasswordUseCaseMock";

describe("change Password Controller", () => {

    let changePasswordUseCase : IChangePasswordUseCase;
    let changePasswordController : IChangePasswordController;

    beforeEach(() => {
        changePasswordUseCase = changePasswordUseCaseMock;
        changePasswordController = new ChangePasswordController(changePasswordUseCase);
    });

    it("changes the user's password", async () => {
        const changePasswordToken = "token";
        const newPassword = "12345678";
        const req = getMockReq({ params: { token: changePasswordToken }, body: { password: newPassword }});
        const { res } = getMockRes();

        await changePasswordController.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Password changed successfully' });
    });

});
