import { Request, Response } from "express";
import { IUpdateUserProfileUseCase, IUpdateUserProfileUseCaseProps } from "../../Application/updateUserProfileUseCase";

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
            const { id, name, password } = request.body;
            const avatar = request.file ? request.file.path : null;
            const useCaseProps : IUpdateUserProfileUseCaseProps = { id, name, password, avatar };

            await this.updateUserProfileUseCase.execute(useCaseProps);

            response.status(200).json({ message: 'Profile updated successfully' });
        }
        catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}