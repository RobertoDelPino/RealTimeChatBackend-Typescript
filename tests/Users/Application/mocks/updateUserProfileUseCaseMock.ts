import { IUpdateUserProfileUseCase } from "../../../../src/Users/Application/updateUserProfileUseCase";

let updateUserProfileUseCaseMock : IUpdateUserProfileUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

export { updateUserProfileUseCaseMock }