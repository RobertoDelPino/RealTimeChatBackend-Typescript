import { IChangePasswordUseCase } from "../../../../src/Users/Application/changePasswordUseCase";

let changePasswordUseCaseMock : IChangePasswordUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

export { changePasswordUseCaseMock };