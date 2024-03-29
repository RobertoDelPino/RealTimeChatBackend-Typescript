import { ISearchUserByEmailUseCase, SearchUserByEmailUseCase } from "../../../src/Users/Application/searchUserByEmailUseCase";
import { IUserRepository } from "../../../src/Users/Domain/interfaces/userRepository";
import { userRepositoryMock } from "../Domain/Mocks/userRepository";
import { createUser } from "./builders/createUser";

describe('searchUserByEmailUseCase', () => {

    let searchUserByEmailUseCase: ISearchUserByEmailUseCase;
    let userRepository: IUserRepository;

    beforeEach(() => {
        userRepository = userRepositoryMock;
        searchUserByEmailUseCase = new SearchUserByEmailUseCase(userRepository);
    });

    it('returns a user', async () => {
        const expectedUser = createUser();
        userRepository.findByEmail = jest.fn().mockReturnValue(expectedUser);

        const user = await searchUserByEmailUseCase.execute("email");

        expect(user).toEqual(expectedUser);
    });

    it('throws an error if email is empty', async () => {
        await expect(searchUserByEmailUseCase.execute("")).rejects.toThrow('Email is required');
    });
});

