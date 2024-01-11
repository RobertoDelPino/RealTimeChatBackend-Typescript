import { Request, Response } from "express";
import { IGetProfileUseCase } from "../../Application/getProfileUseCase";

export class GetProfileController {
    constructor(private getProfileUseCase: IGetProfileUseCase) {
    }
    async execute(request: Request, response: Response) {
        try {
            const userRequest = request.user;
            if(!userRequest){
                throw new Error('User not found');
            }
            const user = await this.getProfileUseCase.execute(userRequest?.email.value);
            response.status(200).json(user);
        }
        catch (error) {
            response.status(400).json({ error: error.message });
        }
    }
}