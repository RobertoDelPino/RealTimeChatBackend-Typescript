import { IUploadPhotoService } from "../../Domain/interfaces/uploadPhoto";
import fs from 'fs';
import path from 'path';

export class UploadPhoto implements IUploadPhotoService {

    constructor() {
    }

    async uploadPhoto(photo: any): Promise<void> {
        console.log(photo)
        const photoPath = path.join(__dirname, '../../../', 'UserPhotos', photo.name);

        fs.writeFile(photoPath, photo, (err) => {
            if (err) {
                throw err;
            }
            console.log('Photo saved successfully');
        });
    }
}