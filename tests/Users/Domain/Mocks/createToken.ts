import { ICreateToken } from "../../../../src/Users/Domain/interfaces/createToken";

let createTokenMock : ICreateToken = {
    createToken: jest.fn().mockReturnValue("token"),
    createEmptyToken: jest.fn()
};

export { createTokenMock };