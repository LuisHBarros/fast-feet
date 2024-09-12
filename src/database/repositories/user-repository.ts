import { User } from '@/domains/user/domain/entities/user';

export abstract class UserRepository {
    abstract save(user: User): Promise<void>;
    abstract findByDocument(document: string): Promise<User | null>;
    abstract findById(id: string): Promise<User | null>;
    abstract delete(id: string): Promise<void>;
}
