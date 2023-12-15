export class User{
    constructor(
        private readonly id: string,
        private readonly name: string,
        private readonly email: string,
        private readonly password: string
    ){}

    getId(): string{
        return this.id;
    }

    getName(): string{
        return this.name;
    }

    getEmail(): string{
        return this.email;
    }

    getPassword(): string{
        return this.password;
    }
}