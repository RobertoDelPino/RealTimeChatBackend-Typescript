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

    it("Returns status code 200", async () => {
        const request = getMockReq({ body: { name: "name", password: "password" }, file: { path: "path" }});
        const response = getMockRes().res;

        await updateUserProfileController.execute(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
    });

    it("Returns status code 400 when usecase fail", async () => {
        const request = getMockReq({ body: { name: "name", password: "password" }, file: { path: "path" }});
        const response = getMockRes().res;
        updateUserProfileUseCase.execute = jest.fn().mockRejectedValue(new Error("Error saving user profile"))
   

        await updateUserProfileController.execute(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "Error saving user profile" });
    });
});