import { Request, Response } from "express";
import { IChangePasswordUseCase } from "../../Application/changePasswordUseCase";


export class changePasswordController {
    private useCase: IChangePasswordUseCase;

    constructor(useCase: IChangePasswordUseCase) {
        this.useCase = useCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { token } = request.params;
            const { password } = request.body;

            await this.useCase.execute(token, password);

            return response.status(200).json({ message: 'Password changed successfully' });
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}


