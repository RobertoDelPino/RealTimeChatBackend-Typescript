import { Request, Response } from 'express';
import { IForgotPasswordUseCase } from '../../Application/forgotPasswordUseCase';

export interface IForgotPasswordController {
    handle(request: Request, response: Response): Promise<Response>;
}

export class ForgotPasswordController implements IForgotPasswordController {
    private forgotPasswordUseCase: IForgotPasswordUseCase;

    constructor(forgotPasswordUseCase: IForgotPasswordUseCase) {
        this.forgotPasswordUseCase = forgotPasswordUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        try {
            await this.forgotPasswordUseCase.execute(email);
            return response.status(200).json({ message: 'Password reset email sent' });
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}
