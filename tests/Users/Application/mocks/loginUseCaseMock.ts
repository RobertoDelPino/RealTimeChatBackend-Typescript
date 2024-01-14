import { ILoginUseCase } from "../../../../src/Users/Application/loginUseCase";

let loginUseCaseMock : ILoginUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

export { loginUseCaseMock };