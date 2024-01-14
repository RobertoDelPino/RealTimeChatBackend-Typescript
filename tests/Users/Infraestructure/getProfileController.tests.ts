import { GetProfileController, IGetProfileController } from "../../../src/Users/Infraestructure/Controllers/getProfileController";
import { IGetProfileUseCase } from "../../../src/Users/Application/getProfileUseCase";
import { getProfileUseCaseMock as GetProfileUseCase } from "../Application/mocks/getProfileUseCaseMock";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { User } from "../../../src/Users/Domain/entities/User";
import { UserId } from "../../../src/Users/Domain/valueObjects/UserId";
import { UserName } from "../../../src/Users/Domain/valueObjects/UserName";
import { UserEmail } from "../../../src/Users/Domain/valueObjects/UserEmail";
import { Password } from "../../../src/Users/Domain/valueObjects/Password";
import { Token } from "../../../src/Users/Domain/valueObjects/Token";
import { Avatar } from "../../../src/Users/Domain/valueObjects/Avatar";

describe("Get Profile Controller", () => {
    let getProfileUseCase : IGetProfileUseCase;
    let getProfileController : IGetProfileController;

    beforeEach(() => {
        getProfileUseCase = GetProfileUseCase;
        getProfileController = new GetProfileController(getProfileUseCase);
    });

    it("should get a profile", async () => {
        const changePasswordToken = "token";
        const user = createUser();
        const req = getMockReq({ params: { token: changePasswordToken}, user: user });
        const { res } = getMockRes();

        await getProfileController.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(200)
    });
});

function createUser() : User {
    return new User(
        UserId.createFromBussiness("id"),
        UserName.createFromBussiness("name"),
        UserEmail.createFromBussiness("email"),
        Password.createFromBussiness("password"),
        Token.createFromBussiness("token"),
        Token.createFromBussiness("token"),
        true,
        Avatar.createFromBussiness("avatar")
    );
}