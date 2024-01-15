import { Avatar } from "../../../../src/Users/Domain/valueObjects/Avatar";
import { isRight, fold } from "fp-ts/lib/Either";

describe("Avatar", () => {

    it("should create a valid Avatar", () => {
        const avatar = Avatar.create('aaaa');
        expect(isRight(avatar)).toBeTruthy();
    });

    it("should fail on create an Avatar with an invalid value", () => {
        const avatar = Avatar.create('');
      
        fold(
          (error) => { expect(error).toBe('Invalid value for Avatar'); },
          () => { fail('Avatar.create should have returned a Left'); }
        )(avatar);
      });

    it("should create an Avatar from bussiness", () => {
        const avatar = Avatar.createFromBussiness('aaaa');
        expect(avatar).toBeInstanceOf(Avatar);
        expect(avatar.value).toBe('aaaa');
    });
});