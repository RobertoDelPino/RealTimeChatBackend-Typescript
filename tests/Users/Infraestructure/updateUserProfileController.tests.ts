import { IUpdateUserProfileUseCase } from "../../../src/Users/Application/updateUserProfileUseCase";
import { IUpdateUserProfileController, UpdateUserProfileController } from "../../../src/Users/Infrastructure/Controllers/updateUserProfileController";
import { updateUserProfileUseCaseMock } from "../Application/mocks/updateUserProfileUseCaseMock";
import { getMockReq, getMockRes } from "@jest-mock/express";

describe("Update User Profile Controller", () => {

    let updateUserProfileController: IUpdateUserProfileController;
    let updateUserProfileUseCase: IUpdateUserProfileUseCase;

    beforeAll(() => {
        updateUserProfileUseCase = updateUserProfileUseCaseMock;
        updateUserProfileController = new UpdateUserProfileController(updateUserProfileUseCase);
    });

    it("Should return status code 200", async () => {
        const request = getMockReq({ body: { name: "name", password: "password" }, file: { path: "path" }});
        const response = getMockRes().res;

        await updateUserProfileController.execute(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
    });
});