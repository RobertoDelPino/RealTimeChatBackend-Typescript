import { getMockReq, getMockRes } from "@jest-mock/express";
import { getProfilePhotoUseCaseMock } from "../Application/mocks/getProfilePhotoUseCaseMock";

describe('getProfilePhotoController Controller', () => {

    let controller : IGetProfilePhotoController;
    let useCase : IGetProfilePhotoUseCase;

    beforeEach(() => {
        useCase = getProfilePhotoUseCaseMock;
        controller = new ProfilePhotoController(useCase);
    });

    it('gets a profile photo', async () => {
        const req = getMockReq({user: {userId: "123"}});
        const { res } = getMockRes();

        await controller.execute(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });

});

export interface IGetProfilePhotoController {
    execute(req: any, res: any): Promise<void>;
}

export interface IGetProfilePhotoUseCase {
    execute(userId: string): Promise<void>;
}

export class ProfilePhotoController implements IGetProfilePhotoController {
    constructor(private useCase: IGetProfilePhotoUseCase) {}

    async execute(req: any, res: any): Promise<void> {
        const { userId } = req.user;

        try {
            const userAvatar = await this.useCase.execute(userId);
            res.status(200).sendFile(userAvatar);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}
