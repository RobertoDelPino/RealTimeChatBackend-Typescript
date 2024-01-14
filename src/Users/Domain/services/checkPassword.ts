import { Password } from "../valueObjects/Password";
import bcrypt from 'bcrypt';

export async function checkPassword(password: string, passwordToCompare: Password) {
    return await bcrypt.compare(password, passwordToCompare.value);
}