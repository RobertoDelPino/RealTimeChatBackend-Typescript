export interface IUpdateUserProfileUseCaseProps{
    id: string,
    name: string,
    password: string,
    avatar: any
}


export interface IUpdateUserProfileUseCase{
    execute(request: IUpdateUserProfileUseCaseProps): Promise<void>;
}
