import { InMemoryUserRepository } from "test/repositories/in-memory-user-repository";
import { ChangeUserPassword } from "./change-user-password";
import { User } from "../../domain/entities/user";
import { UniqueEntityID } from "@/core/entity/unique-entity-id";
import { Encrypt } from "../util/encrypt";

describe("Test ChangeUserPassword use case", () => {
    let changeUserPassword: ChangeUserPassword;
    let userRepository: InMemoryUserRepository;
    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        changeUserPassword = new ChangeUserPassword(userRepository);
    })
    it("should change user password", async () => {
        await userRepository.save(User.create({
            name: "John Doe",
            document: "123456789",
            password: await Encrypt.genHash("123456"),
            role: "admin"
        },
            new UniqueEntityID("1")));
        const response = await changeUserPassword.execute({
            userId: "1",
            oldPassword: "123456",
            newPassword: "654321"
        });
        expect(response.isRight()).toBeTruthy();
    });
    it("should not change user password if user not found", async () => {
        const response = await changeUserPassword.execute({
            userId: "1",
            oldPassword: "123456",
            newPassword: "654321"
        });
        expect(response.isLeft()).toBeTruthy();
    });
    it("should not change user password if old password is incorrect", async () => {
        await userRepository.save(User.create({
            name: "John Doe",
            document: "123456789",
            password: await Encrypt.genHash("123456"),
            role: "admin"
        },
            new UniqueEntityID("1")));
        const response = await changeUserPassword.execute({
            userId: "1",
            oldPassword: "654321",
            newPassword: "654321"
        });
        expect(response.isLeft()).toBeTruthy();
    });
    it("should not change user password if the user is not an admin", async () => {
        await userRepository.save(User.create({
            name: "John Doe",
            document: "123456789",
            password: await Encrypt.genHash("123456"),
            role: "deliveryman"
        },
            new UniqueEntityID("1")));
        const response = await changeUserPassword.execute({
            userId: "1",
            oldPassword: "123456",
            newPassword: "654321"
        });
        expect(response.isLeft()).toBeTruthy();
    });
});