import { Password } from "../valueObjects/Password";
import bcrypt from 'bcrypt';

export async function checkPassword(password: Password, passwordToCompare: Password) {
    return await bcrypt.compare(password.value, passwordToCompare.value);
}