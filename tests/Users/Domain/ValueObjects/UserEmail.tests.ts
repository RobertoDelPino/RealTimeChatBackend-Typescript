import { UserEmail } from "../../../../src/Users/Domain/valueObjects/UserEmail";
import { isRight, fold } from "fp-ts/lib/Either";

describe("userEmail Value Object", () => {

    it("should create a valid userEmail", () => {
        const validUserEmail = "roberto@prueba.com";
        const userEmail = UserEmail.create(validUserEmail);
        expect(isRight(userEmail)).toBeTruthy();
    });

    it("should fail on create an userEmail with an invalid value", () => {
        const invalidUserEmail = "";
        const userEmail = UserEmail.create(invalidUserEmail);
      
        fold(
          (error) => { expect(error).toBe('Invalid value for Email'); },
          () => { fail('userEmail.create should have returned a Left'); }
        )(userEmail);
      });

    it("should create an userEmail from bussiness", () => {
        const validUserEmail = "roberto@prueba.com";
        const userEmail = UserEmail.createFromBussiness(validUserEmail);
        expect(userEmail).toBeInstanceOf(UserEmail);
        expect(userEmail.value).toBe(validUserEmail);
    });
});