import { InMemoryUserRepository } from "test/repositories/in-memory-user-repository";
import { GetUser } from "./get-user";
import { User } from "../../domain/entities/user";

describe("Test GetUser use case", () => {
    let getUser: GetUser;
    let userRepository: InMemoryUserRepository;
    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        getUser = new GetUser(userRepository);
    })
    it("should get user", async () => {
        const user = User.create({
            name: "John Doe",
            document: "123456789",
            password: "123456",
            role: "admin"
        });
        await userRepository.save(user);
        const response = await getUser.execute({
            id: user.id.value
        });
        expect(response.isRight()).toBeTruthy();
    });
    it("should not get user if user not found", async () => {
        const response = await getUser.execute({
            id: "1"
        });
        expect(response.isLeft()).toBeTruthy();
    });
});