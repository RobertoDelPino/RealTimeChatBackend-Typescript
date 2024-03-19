import { IGetProfilePhotoUseCase } from "../../Infraestructure/getprofilePhotoController.tests";

let getProfilePhotoUseCaseMock : IGetProfilePhotoUseCase = {
    execute: jest.fn().mockReturnValue(true)
};

export { getProfilePhotoUseCaseMock };