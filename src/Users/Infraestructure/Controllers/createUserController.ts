import { Request, Response } from 'express';
import { ICreateUserUseCase, UserData } from '../../Application/createUserUseCase';

export interface ICreateUserController {
    handle(request: Request, response: Response): Promise<Response>;
}

export class CreateUserController implements ICreateUserController {
    private createUserUseCase: ICreateUserUseCase;

    constructor(createUserUseCase: ICreateUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { name, email, password } = request.body;

            const userData : UserData = {
                name,
                email,
                password
            };

            let user = await this.createUserUseCase.execute(userData);

            return response.status(201).json(user);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}
