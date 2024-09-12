import {hash, compare, genSaltSync} from "bcrypt"

export class Encrypt {
    public static async genHash(password: string): Promise<string> {
        return await hash(password, genSaltSync(10)).catch(() => {
            throw new Error("Error hashing password")
        });
    }
    public static compare(password: string, hash: string): Promise<boolean> {
        return compare(password, hash);
    }
}