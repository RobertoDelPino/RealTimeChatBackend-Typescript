import { IUploadPhotoService } from "../../Domain/interfaces/uploadPhoto";
import fs from 'fs';
import path from 'path';

export class UploadPhoto implements IUploadPhotoService {

    constructor() {
    }

    async uploadPhoto(photo: any): Promise<void> {
        console.log(photo)
        const allowedMimeTypes = ['image/jpeg', 'image/webp', 'image/png'];
        if (!allowedMimeTypes.includes(photo.mimetype)) {
            throw new Error('Invalid photo format. Only JPEG, WebP, and PNG are allowed.');
        }

        const photoPath = path.join(__dirname, '../../../', 'UserPhotos', photo.originalname);
        try {
            await fs.promises.writeFile(photoPath, photo.buffer);
            console.log('Photo saved successfully');
        } catch (err) {
            throw err;
        }
    }
}