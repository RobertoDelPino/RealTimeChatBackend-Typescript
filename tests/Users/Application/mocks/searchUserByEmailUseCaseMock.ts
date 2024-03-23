import { ISearchUserByEmailUseCase } from "../../../../src/Users/Application/searchUserByEmailUseCase";

const searchUseByEmailUseCaseMock : ISearchUserByEmailUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

export { searchUseByEmailUseCaseMock };