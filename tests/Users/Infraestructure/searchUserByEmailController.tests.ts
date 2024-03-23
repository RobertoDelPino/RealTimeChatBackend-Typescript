import { getMockReq, getMockRes } from "@jest-mock/express";
import { ISearchUserByEmailUseCase } from "../../../src/Users/Application/searchUserByEmailUseCase";
import { searchUseByEmailUseCaseMock } from "../Application/mocks/searchUserByEmailUseCaseMock";
import { ISearchUserByEmailController, SearchUserByEmailController } from "../../../src/Users/Infrastructure/Controllers/searchUserByEmailController";

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

