import { Request, Response } from 'express';
import { IGetAllUsersUseCase } from '../../Application/getAllUserUseCase';
import { User } from '../../Domain/entities/User';

class getAllUsersController {

    private useCase: IGetAllUsersUseCase;

    constructor(getAllUserUseCase: IGetAllUsersUseCase){
        this.useCase = getAllUserUseCase
    }

    async exec(_req: Request, res: Response): Promise<void> {
        try {
            const users: User[] = await this.useCase.execute();
            res.status(200).json({users: users});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default getAllUsersController;