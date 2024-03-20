import { Either, fold } from "fp-ts/lib/Either";
import { IUserRepository } from "../Domain/interfaces/userRepository";
import { Password } from "../Domain/valueObjects/Password";
import { Avatar } from "../Domain/valueObjects/Avatar";
import { UserName } from "../Domain/valueObjects/UserName";

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
        private userRepository: IUserRepository) {
    }

    async execute(props: IUpdateUserProfileUseCaseProps): Promise<void> {
        const request = createRequest(props.name, props.password, props.avatar);
        
        const user = await this.userRepository.findById(props.id);
        if (!user) {
            throw new Error("User not found");
        }

        user.name = request.name;
        user.password = request.password;
        user.avatar = request.avatar;

        await this.userRepository.save(user);

        function createRequest(
            newName: string, 
            newPassword: string, 
            newAvatar: any
        ) : {name: UserName, password: Password, avatar: Avatar}{
            
            let errors: string[] = [];

            let name: UserName;
            let password: Password;
            let avatar: Avatar;

            const nameResult = UserName.create(newName);
            const passwordResult = Password.create(newPassword);
            const avatarResult = Avatar.create(newAvatar);
            handleValueObject(nameResult, (value: UserName) => name = value, (error: string) => errors.push(error));
            handleValueObject(passwordResult, (value: Password) => password = value, (error: string) => errors.push(error));
            handleValueObject(avatarResult, (value: Avatar) => avatar = value, (error: string) => errors.push(error));

            if(errors.length > 0) {
                throw new Error(errors.join(', '));
            }

            return {name: name!, password: password!, avatar: avatar!};

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
