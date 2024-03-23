import { Request, Response } from "express";
import { ISearchUserByEmailUseCase } from "../../Application/searchUserByEmailUseCase";

export interface ISearchUserByEmailController {
    execute(request: Request, response: Response): Promise<void>;
}

export class SearchUserByEmailController implements ISearchUserByEmailController {
    constructor(private searchUserByEmailUseCase: ISearchUserByEmailUseCase) { }

    async execute(request: Request, response: Response): Promise<void> {
        try{
            const { email } = request.params;
            const user = await this.searchUserByEmailUseCase.execute(email);
            if (!user) {
                response.status(404).json({ message: 'User not found' });
                return;
            }
    
            response.status(200).json(user);
        }
        catch(error){
            response.status(500).send({error: error.message});
        }
    }
}