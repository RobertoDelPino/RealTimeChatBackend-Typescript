import { IUserRepository } from "../../../../src/Users/Domain/interfaces/userRepository";

let userRepositoryMock : IUserRepository = {
    findById: jest.fn(),
    findByEmail: jest.fn(),
    findByUsername: jest.fn(),
    update: jest.fn(),
    findByConfirmAccountToken: jest.fn(),
    findByChangePasswordToken: jest.fn(),
    save: jest.fn()
};

export { userRepositoryMock };