interface ISearchUserByEmailUseCase {
    execute(email: string): Promise<boolean>;
}

export { ISearchUserByEmailUseCase };