import { IUploadPhotoService } from "../../Domain/interfaces/uploadPhoto";
import fs from 'fs';
import path from 'path';

export class UploadPhoto implements IUploadPhotoService {

    constructor() {
    }

    async uploadPhoto(photo: any): Promise<void> {
        console.log(photo)
        const photoPath = path.join(__dirname, '../../../', 'UserPhotos', photo.name);

        const fileBuffer = Buffer.from(photo.data, 'base64');
        const fileExtension = path.extname(photo.name).toLowerCase();
        if (fileExtension !== '.jpg' && fileExtension !== '.png') {
            throw new Error('Invalid file type. Only JPG and PNG files are allowed.');
        }
        
        fs.writeFile(photoPath, fileBuffer, (err) => {
            if (err) {
            throw err;
            }
            console.log('Photo saved successfully');
        });
    }
}