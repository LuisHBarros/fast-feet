import { UserRepository } from '@/database/repositories/user-repository';
import { User } from '@/domains/user/domain/entities/user';

export class InMemoryUserRepository implements UserRepository {
    public users: User[] = [];

    async delete(id: string): Promise<void> {
        this.users = this.users.filter((user) => user.id.value !== id);
    }

    async findByDocument(document: string): Promise<User | null> {
        return this.users.find((user) => user.document === document) || null;
    }

    async findById(id: string): Promise<User | null> {
        return this.users.find((user) => user.id.value === id) || null;
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }
}
