describe("LoginUseCase", () => {
    test("should login user", () => {

        const userRepository : IUserRepository= new UserRepository();
        const loginUseCase = new LoginUseCase();

        const result = loginUseCase.execute("username", "password");

        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("email");
        expect(result).toHaveProperty("avatar");
        expect(result).toHaveProperty("token");
        expect(userRepository.findUserByUsername).toHaveBeenCalledWith("username");
    });
})    