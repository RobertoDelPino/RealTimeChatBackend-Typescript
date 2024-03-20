import { IUploadPhotoService } from "../../../../src/Users/Domain/interfaces/uploadPhoto";

let uploadPhotoServiceMock : IUploadPhotoService = {
    uploadPhoto: jest.fn().mockReturnValue(true)
};

export { uploadPhotoServiceMock };