export interface IUpdateUserProfileUseCase{
    execute(name: string, password: string, avatar: string): Promise<void>;
}
