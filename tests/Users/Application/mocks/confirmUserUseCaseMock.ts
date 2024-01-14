import { IConfirmUserUseCase } from "../../../../src/Users/Application/confirmUserUseCase";

let confirmUserUseCaseMock : IConfirmUserUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

export { confirmUserUseCaseMock };