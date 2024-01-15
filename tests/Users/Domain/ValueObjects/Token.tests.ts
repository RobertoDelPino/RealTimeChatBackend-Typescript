import { Token } from "../../../../src/Users/Domain/valueObjects/Token";
import { isRight, fold } from "fp-ts/lib/Either";

describe("token Value Object", () => {

    it("should create a valid token", () => {
        const validToken = "12345678";
        const token = Token.create(validToken);
        expect(isRight(token)).toBeTruthy();
    });

    it("should fail on create an token with an invalid value", () => {
        const invalidToken = 1;
        const token = Token.create(invalidToken);
      
        fold(
          (error) => { expect(error).toBe('Invalid value for Token'); },
          () => { fail('token.create should have returned a Left'); }
        )(token);
      });

    it("should create an token from bussiness", () => {
        const validToken = "12345678";
        const token = Token.createFromBussiness(validToken);
        expect(token).toBeInstanceOf(Token);
        expect(token.value).toBe(validToken);
    });
});