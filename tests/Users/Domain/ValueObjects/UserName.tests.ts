import { UserName } from "../../../../src/Users/Domain/valueObjects/UserName";
import { isRight, fold } from "fp-ts/lib/Either";

describe("UserName Value Object", () => {

    it("should create a valid userName", () => {
        const validUserName = "123";
        const userName = UserName.create(validUserName);
        expect(isRight(userName)).toBeTruthy();
    });

    it("should fail on create an userName with an invalid value", () => {
        const invalidUserName = "";
        const userName = UserName.create(invalidUserName);
      
        fold(
          (error) => { expect(error).toBe('Invalid value for Name'); },
          () => { fail('userName.create should have returned a Left'); }
        )(userName);
      });

    it("should create an userName from bussiness", () => {
        const validUserName = "123";
        const userName = UserName.createFromBussiness(validUserName);
        expect(userName).toBeInstanceOf(UserName);
        expect(userName.value).toBe(validUserName);
    });
});