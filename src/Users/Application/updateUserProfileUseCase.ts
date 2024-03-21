import { Either, fold } from "fp-ts/lib/Either";
import { IUserRepository } from "../Domain/interfaces/userRepository";
import { Password } from "../Domain/valueObjects/Password";
import { Avatar } from "../Domain/valueObjects/Avatar";
import { UserName } from "../Domain/valueObjects/UserName";
import { IUploadPhotoService } from "../Domain/interfaces/uploadPhoto";
import fs from "fs"
import hashString from "../Domain/services/hashString";

export interface IUpdateUserProfileUseCaseProps{
    id: string,
    name: string,
    password: string,
    avatar: any
}

export interface IUpdateUserProfileUseCase{
    execute(request: IUpdateUserProfileUseCaseProps): Promise<void>;
}

export class UpdateUserProfileUseCase implements IUpdateUserProfileUseCase{
    constructor(
        private userRepository: IUserRepository,
        private uploadPhotoService: IUploadPhotoService) {
    }

    FOLDER_NAME = "src/UserPhotos/"

    async execute(props: IUpdateUserProfileUseCaseProps): Promise<void> {      
        const user = await this.userRepository.findById(props.id);
        if (!user) {
            throw new Error("User not found");
        }

        if(props.avatar){
            const oldAvatar = user.avatar.value.replace("\\", "/")
            if(oldAvatar !== "src/UserPhotos/defaultAvatar.webp"){
                fs.unlink(oldAvatar, (err) => {
                    if (err) {console.error(err); return}
                })
            }
    
            const avatarName = this.FOLDER_NAME + props.avatar.originalname;
            const avatar = createAvatar(avatarName);
            user.avatar = avatar;
            await this.uploadPhotoService.uploadPhoto(props.avatar);
        } 

        if(props.password){
            const passwordHashed = await hashString(props.password);
            const password = createPassword(passwordHashed);
            user.password = password;
        }
        
        const name = createUserName(props.name);
        user.name = name;
        
        await this.userRepository.update(user);

        function createUserName(newName: string) : UserName{
            let errors: string[] = [];
            let name: UserName;
            
            const nameResult = UserName.create(newName);
            handleValueObject(nameResult, (value: UserName) => name = value, (error: string) => errors.push(error));

            if(errors.length > 0) {
                throw new Error(errors.join(', '));
            }
            return name!;

            function handleValueObject<T>(result: Either<string, T>, setValue: (value: T) => void, setError: (value: string) => void): void {
                const getValue = fold(
                  (error: string) => setError(error),
                  (value: T) => setValue(value)
                );
              
                getValue(result);
            }
        }

        function createPassword(newPassword: string) : Password{
            let errors: string[] = [];
            let password: Password;
            
            const passwordResult = Password.create(newPassword);
            handleValueObject(passwordResult, (value: Password) => password = value, (error: string) => errors.push(error));

            if(errors.length > 0) {
                throw new Error(errors.join(', '));
            }
            return password!;

            function handleValueObject<T>(result: Either<string, T>, setValue: (value: T) => void, setError: (value: string) => void): void {
                const getValue = fold(
                  (error: string) => setError(error),
                  (value: T) => setValue(value)
                );
              
                getValue(result);
            }
        }

        function createAvatar(newAvatar: any) : Avatar{
            let errors: string[] = [];
            let avatar: Avatar;
            
            const avatarResult = Avatar.create(newAvatar);
            handleValueObject(avatarResult, (value: Avatar) => avatar = value, (error: string) => errors.push(error));

            if(errors.length > 0) {
                throw new Error(errors.join(', '));
            }
            return avatar!;

            function handleValueObject<T>(result: Either<string, T>, setValue: (value: T) => void, setError: (value: string) => void): void {
                const getValue = fold(
                  (error: string) => setError(error),
                  (value: T) => setValue(value)
                );
              
                getValue(result);
            }
        }
    }
}