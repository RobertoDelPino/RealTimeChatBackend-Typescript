import { Either, fold } from "fp-ts/lib/Either";
import { IUpdateUserProfileUseCase, IUpdateUserProfileUseCaseProps } from "../../../src/Users/Application/updateUserProfileUseCase";
import { IUserRepository  } from "../../../src/Users/Domain/interfaces/userRepository";
import { UserName } from "../../../src/Users/Domain/valueObjects/UserName";
import { userRepositoryMock  } from "../Domain/Mocks/userRepository";
import { Password } from "../../../src/Users/Domain/valueObjects/Password";
import { Avatar } from "../../../src/Users/Domain/valueObjects/Avatar";
import { User } from "../../../src/Users/Domain/entities/User";
import { UserId } from "../../../src/Users/Domain/valueObjects/UserId";
import { UserEmail } from "../../../src/Users/Domain/valueObjects/UserEmail";
import { Token } from "../../../src/Users/Domain/valueObjects/Token";

describe("Update User Profile Use Case", () => {

    let updateUserProfileUseCase: IUpdateUserProfileUseCase;
    let userRepository: IUserRepository;

    beforeAll(() => {
        userRepository = userRepositoryMock;
        updateUserProfileUseCase = new UpdateUserProfileUseCase(userRepository);
    });

    it("Updates user profile", async () => {
        const request: IUpdateUserProfileUseCaseProps = {
            id: "1",
            name: "John Doe",
            password: "password",
            avatar: "avatar"
        };
        userRepository.findById = jest.fn().mockResolvedValue(createUser())

        await updateUserProfileUseCase.execute(request);

        expect(userRepository.findById).toHaveBeenCalledWith(request.id);
        expect(userRepository.save).toHaveBeenCalled();
    });

    it("throws an error if the user does not exist", async () => {
        const request: IUpdateUserProfileUseCaseProps = {
            id: "1",
            name: "John Doe",
            password: "password",
            avatar: "avatar"
        };
        userRepository.findById = jest.fn().mockResolvedValue(null);

        const useCasePromise = updateUserProfileUseCase.execute(request);

        await expect(useCasePromise).rejects.toThrow('User not found');
    });

});

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

function createUser() : User {
    return new User(
        UserId.createFromBussiness("id"),
        UserName.createFromBussiness("name"),
        UserEmail.createFromBussiness("email"),
        Password.createFromBussiness("password"),
        Token.createFromBussiness("token"),
        Token.createFromBussiness("token"),
        true,
        Avatar.createFromBussiness("avatar")
    );
}

