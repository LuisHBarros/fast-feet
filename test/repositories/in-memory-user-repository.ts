import { User } from "@/domains/user/domain/entities/user";
import { UserRepository } from "@/domains/user/domain/repository/user-repository";

export class InMemoryUserRepository implements UserRepository{
    private users: User[] = [];

    async delete(id: string): Promise<void> {
        this.users = this.users.filter(user => user.id.value !== id);
    }

    async findByDocument(document: string): Promise<User | null> {
        return this.users.find(user => user.document === document) || null;
    }

    async findById(id: string): Promise<User | null> {
        return this.users.find(user => user.id.value === id) || null;
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }
}