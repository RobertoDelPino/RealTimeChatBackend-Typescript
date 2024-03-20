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
        const request = getMockReq({ body: { name: "name", password: "password" }, file: { path: "path" }});
        const response = getMockRes().res;

        await updateUserProfileController.execute(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
    });
});

export interface IUpdateUserProfileController{
    execute(request: Request, response: Response): Promise<void>;
}

interface MulterRequest extends Request {
    file: any;
}

export class UpdateUserProfileController implements IUpdateUserProfileController{
    constructor(
        private updateUserProfileUseCase: IUpdateUserProfileUseCase) {
    }

    async execute(request: MulterRequest, response: Response) {
        try {
            const { name, password } = request.body;
            const avatar = request.file ? request.file.path : null;

            await this.updateUserProfileUseCase.execute(name, password, avatar);

            response.status(200).json({ message: 'Profile updated successfully' });
        }
        catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}

export interface IUpdateUserProfileUseCase{
    execute(name: string, password: string, avatar: string): Promise<void>;
}
