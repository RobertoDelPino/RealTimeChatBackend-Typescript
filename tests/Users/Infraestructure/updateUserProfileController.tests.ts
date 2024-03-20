import { Request, Response } from "express";
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
        const request = getMockReq({ body: { name: "name", password: "password", avatar: "avatar" } });
        const response = getMockRes().res;

        await updateUserProfileController.execute(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
    });
});

export interface IUpdateUserProfileController{
    execute(request: Request, response: Response): Promise<void>;
}

export class UpdateUserProfileController implements IUpdateUserProfileController{
    constructor(private updateUserProfileUseCase: IUpdateUserProfileUseCase) {
    }

    async execute(request: Request, response: Response) {
        try {
            const { name, password, avatar } = request.body;

            await this.updateUserProfileUseCase.execute(name, password, avatar);

            response.status(200);
        }
        catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}

export interface IUpdateUserProfileUseCase{
    execute(name: string, password: string, avatar: string): Promise<void>;
}
