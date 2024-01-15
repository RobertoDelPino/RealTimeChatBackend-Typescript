import { Password } from "../../../../src/Users/Domain/valueObjects/Password";
import { isRight, fold } from "fp-ts/lib/Either";

describe("Password Value Object", () => {

    it("should create a valid password", () => {
        const validPassword = "12345678";
        const password = Password.create(validPassword);
        expect(isRight(password)).toBeTruthy();
    });

    it("should fail on create an password with an invalid value", () => {
        const invalidPassword = "pass";
        const password = Password.create(invalidPassword);
      
        fold(
          (error) => { expect(error).toBe('Password must be at least 8 characters long'); },
          () => { fail('password.create should have returned a Left'); }
        )(password);
      });

    it("should create an password from bussiness", () => {
        const validPassword = "12345678";
        const password = Password.createFromBussiness(validPassword);
        expect(password).toBeInstanceOf(Password);
        expect(password.value).toBe(validPassword);
    });
});