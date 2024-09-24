import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { CreateUser } from './create-user';

describe('Test CreateUser use case', () => {
    let createUser: CreateUser;
    let userRepository: InMemoryUserRepository;
    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        createUser = new CreateUser(userRepository);
    });
    it('should create a new user', async () => {
        const user = {
            name: 'John Doe',
            document: '123456789',
            password: '123456',
        };
        const response = await createUser.execute(user);
        expect(response.isRight()).toBeTruthy();
        expect(userRepository.users.length).toBe(1); // Verify if the user was saved
        expect(userRepository.users[0].name).toBe(user.name); // Verify if the user was saved with the correct name
    });
    it('should not create a new user if document already exists', async () => {
        await createUser.execute({
            name: 'John Doe',
            document: '123456789',
            password: '123456',
        });
        const user = {
            name: 'John Doe',
            document: '123456789',
            password: '123456',
        };
        await createUser.execute(user);
        const response = await createUser.execute(user);
        expect(response.isLeft()).toBeTruthy();
    });
});
