import { IUpdateUserProfileUseCase, IUpdateUserProfileUseCaseProps } from "../../../src/Users/Application/updateUserProfileUseCase";
import { IUserRepository  } from "../../../src/Users/Domain/interfaces/userRepository";
import { userRepositoryMock  } from "../Domain/Mocks/userRepository";

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

        await updateUserProfileUseCase.execute(request);

        expect(userRepository.findById).toHaveBeenCalledWith(request.id);
        expect(userRepository.save).toHaveBeenCalled();
    });

});

export class UpdateUserProfileUseCase implements IUpdateUserProfileUseCase{
    constructor(
        private userRepository: IUserRepository) {
    }

    async execute(request: IUpdateUserProfileUseCaseProps): Promise<void> {

    }
}

