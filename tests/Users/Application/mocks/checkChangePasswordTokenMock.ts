import { ICheckChangePasswordTokenUseCase } from "../../../../src/Users/Application/checkChangePasswordTokenUseCase";

let CheckChangePasswordTokenMock : ICheckChangePasswordTokenUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

export { CheckChangePasswordTokenMock };