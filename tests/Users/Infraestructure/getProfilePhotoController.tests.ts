import { getMockReq, getMockRes } from "@jest-mock/express";
import { getProfilePhotoUseCaseMock } from "../Application/mocks/getProfilePhotoUseCaseMock";
import { GetProfilePhotoController, IGetProfilePhotoController } from "../../../src/Users/Infrastructure/Controllers/getProfilePhotoController";

describe('getProfilePhotoController Controller', () => {

    let controller : IGetProfilePhotoController;
    let useCase : IGetProfilePhotoUseCase;

    beforeEach(() => {
        useCase = getProfilePhotoUseCaseMock;
        controller = new GetProfilePhotoController(useCase);
    });

    it('gets a profile photo', async () => {
        const req = getMockReq({user: {userId: "123"}});
        const { res } = getMockRes();

        await controller.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });

    it("throws an error if user does not exist in request", async () => {
        const req = getMockReq();
        const { res } = getMockRes();

        await controller.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: "User not found"});
    
    });
});

export interface IGetProfilePhotoUseCase {
    execute(userId: string): Promise<void>;
}

