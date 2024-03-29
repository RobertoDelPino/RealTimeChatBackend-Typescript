// crea una funcion que recibe un objeto con los datos del usuario y retorna un objeto con los datos del usuario
// Puede que el objeto que recibe no tenga datos y tenga que rellenarlos con valores por defecto

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

