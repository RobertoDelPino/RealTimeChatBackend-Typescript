import { getMockReq, getMockRes } from "@jest-mock/express";
import { Request, Response } from "express";

describe('Search User By Email Controller', () => {

    let searchUseByEmailUseCase: ISearchUserByEmailUseCase;
    let searchUserByEmailController: ISearchUserByEmailController;

    beforeEach(() => {
        searchUseByEmailUseCase = searchUseByEmailUseCaseMock;
        searchUserByEmailController = new SearchUserByEmailController(searchUseByEmailUseCase);
    });

    it('returns user when is found', async () => {
        const request = getMockReq({ params: { email: 'prueba@test.com'}});
        const response = getMockRes().res;
        const user = {email: 'prueba@test.com', name: 'prueba', avatar: 'avatar'}
        searchUseByEmailUseCase.execute = jest.fn().mockResolvedValue(user);

        await searchUserByEmailController.execute(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(user);
    });

    it('returns 404 when user is not found', async () => {
        const request = getMockReq({ params: { email: 'prueba@test.com'}});
        const response = getMockRes().res;
        searchUseByEmailUseCase.execute = jest.fn().mockResolvedValue(null);

        await searchUserByEmailController.execute(request, response);

        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('returns 500 when an error occurs', async () => {
        const request = getMockReq({ params: { email: 'prueba@test.com'}});
        const response = getMockRes().res;
        searchUseByEmailUseCase.execute = jest.fn().mockRejectedValue(new Error('Error'));

        await searchUserByEmailController.execute(request, response);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.send).toHaveBeenCalledWith({error: 'Error'});
    });
});

interface ISearchUserByEmailUseCase {
    execute(email: string): Promise<boolean>;
}

const searchUseByEmailUseCaseMock : ISearchUserByEmailUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

interface ISearchUserByEmailController {
    execute(request: Request, response: Response): Promise<void>;
}

class SearchUserByEmailController implements ISearchUserByEmailController {
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