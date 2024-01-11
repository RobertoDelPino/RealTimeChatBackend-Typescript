export interface ICreateJWT {
    execute(userProfile: UserProfile): Promise<string>;
}

export interface UserProfile{
    id: string;
    name: string;
    email: string;
}