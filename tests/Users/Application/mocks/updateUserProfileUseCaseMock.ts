import { IUpdateUserProfileUseCase } from "../../Infraestructure/updateUserProfileController.tests";

let updateUserProfileUseCaseMock : IUpdateUserProfileUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

export { updateUserProfileUseCaseMock }