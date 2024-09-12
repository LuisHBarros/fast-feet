import { Encrypt } from "./encrypt";

describe("Test encrypt util", () => {
    it("should encrypt a password", async () => {
        const password = "123456";
        const hash = await Encrypt.genHash(password);
        expect(hash).toBeTruthy();
    });
    it("should return true when compare a password with a hash correctly", async () => {
        const password = "123456";
        const hash = await Encrypt.genHash(password);
        const result = await Encrypt.compare(password, hash);
        expect(result).toBeTruthy();
    });
    it("should return false when compare a password with a hash incorrectly", async () => {
        const password = "123456";
        const hash = await Encrypt.genHash(password);
        const result = await Encrypt.compare("654321", hash);
        expect(result).toBeFalsy();
    });
});