import bcrypt from 'bcrypt';

async function hashString(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(value, salt);
}

export default hashString;