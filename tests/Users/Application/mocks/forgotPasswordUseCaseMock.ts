import { IForgotPasswordUseCase } from "../../../../src/Users/Application/forgotPasswordUseCase";

let forgotPasswordUseCaseMock : IForgotPasswordUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

export { forgotPasswordUseCaseMock };