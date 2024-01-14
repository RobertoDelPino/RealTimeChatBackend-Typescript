import { IGetProfileUseCase } from "../../../../src/Users/Application/getProfileUseCase";

let getProfileUseCaseMock : IGetProfileUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

export { getProfileUseCaseMock };