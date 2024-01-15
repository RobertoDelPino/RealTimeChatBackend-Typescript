import { Request, Response } from "express";

import { ICheckChangePasswordTokenUseCase } from '../../Application/checkChangePasswordTokenUseCase';

export interface ICheckChangePasswordTokenController {
    handle(request: Request, response: Response): Promise<Response>;
}

export class CheckChangePasswordTokenController implements ICheckChangePasswordTokenController {
    private useCase: ICheckChangePasswordTokenUseCase;

    constructor(useCase: ICheckChangePasswordTokenUseCase) {
        this.useCase = useCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { token } = request.params;

            await this.useCase.execute(token);

            return response.status(200).json({ message: 'Token is valid' });
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}


