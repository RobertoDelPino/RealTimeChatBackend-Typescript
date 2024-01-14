import { ICreateUserUseCase } from "../../../../src/Users/Application/createUserUseCase";

let createUserUseCaseMock : ICreateUserUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

export { createUserUseCaseMock };