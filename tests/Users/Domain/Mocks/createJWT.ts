import { UserProfile } from "../../../../src/Users/Domain/entities/UserProfile";
import { ICreateJWT } from "../../../../src/Users/Domain/interfaces/createJWT";

let createJWTMock : ICreateJWT = {
    execute: jest.fn().mockReturnValue(new UserProfile("name", "email", "token"))
};

export { createJWTMock };