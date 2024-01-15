import { UserId } from "../../../../src/Users/Domain/valueObjects/UserId";
import { isRight, fold } from "fp-ts/lib/Either";

describe("userId Value Object", () => {

    it("should create a valid userId", () => {
        const validUserId = "123";
        const userId = UserId.create(validUserId);
        expect(isRight(userId)).toBeTruthy();
    });

    it("should fail on create an userId with an invalid value", () => {
        const invalidUserId = "";
        const userId = UserId.create(invalidUserId);
      
        fold(
          (error) => { expect(error).toBe('Invalid value for UserId'); },
          () => { fail('userId.create should have returned a Left'); }
        )(userId);
      });

    it("should create an userId from bussiness", () => {
        const validUserId = "123";
        const userId = UserId.createFromBussiness(validUserId);
        expect(userId).toBeInstanceOf(UserId);
        expect(userId.value).toBe(validUserId);
    });
});