import { getMockReq, getMockRes } from '@jest-mock/express'
import { ICheckChangePasswordTokenUseCase } from "../../../src/Users/Application/checkChangePasswordTokenUseCase";
import { CheckChangePasswordTokenMock } from "../Application/mocks/checkChangePasswordTokenMock";
import { ICheckChangePasswordTokenController, CheckChangePasswordTokenController } from "../../../src/Users/Infraestructure/Controllers/checkChangePasswordTokenController"

describe("CheckChangePasswordTokenController", () => {

    let checkChangePasswordTokenUseCase: ICheckChangePasswordTokenUseCase;
    let checkChangePasswordTokenController: ICheckChangePasswordTokenController;

    beforeEach(() => {
        checkChangePasswordTokenUseCase = CheckChangePasswordTokenMock;
        checkChangePasswordTokenController = new CheckChangePasswordTokenController(checkChangePasswordTokenUseCase);
    });

    it("should return 200 when token is valid", async () => {
        const changePasswordToken = "token";
        const req = getMockReq({ params: { token: changePasswordToken } });
        const { res } = getMockRes();

        await checkChangePasswordTokenController.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});