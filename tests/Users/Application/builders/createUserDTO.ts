import { UserDTO } from "../../../../src/Users/Application/searchUserByEmailUseCase";

interface UserRequestDTO {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export function createUserDTO(user?: UserRequestDTO): UserDTO{
    return {
        id: user?.id || "",
        name: user?.name || "",
        email: user?.email || "",
        avatar: user?.avatar || ""
    };
};

