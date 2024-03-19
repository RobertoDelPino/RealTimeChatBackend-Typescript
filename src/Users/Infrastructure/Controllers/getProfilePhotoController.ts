import { Request, Response } from "express";
import { IGetProfilePhotoUseCase } from "../../Application/getProfilePhotoUseCase";

export interface IGetProfilePhotoController {
    execute(req: any, res: any): Promise<void>;
}

export class GetProfilePhotoController implements IGetProfilePhotoController {
    constructor(private useCase: IGetProfilePhotoUseCase) {}

    async execute(req: Request, res: Response): Promise<void> {
        const { id } = req.user;

        try {
            const userAvatar: string = await this.useCase.execute(id.value);
            res.status(200).sendFile(userAvatar);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}
