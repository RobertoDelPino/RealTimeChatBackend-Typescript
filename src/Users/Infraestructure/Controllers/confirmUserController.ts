import { Request, Response } from 'express';
import { IConfirmUserUseCase } from '../../Application/confirmUserUseCase';

export class CreateUserController {
    private confirmUserUseCase: IConfirmUserUseCase;

    constructor(confirmUserUseCase: IConfirmUserUseCase) {
        this.confirmUserUseCase = confirmUserUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { token } = request.params;

            await this.confirmUserUseCase.execute(token);

            return response.status(201).json({ message: 'User confirmed' });
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}
