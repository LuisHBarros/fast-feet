import { UserRepository } from '@/database/repositories/user-repository';
import { User } from '@/domains/user/domain/entities/user';

export class PrismaUserRepository implements UserRepository {
    save(user: User): Promise<void> {
        throw new Error('Method not implemented.');
    }
    findByDocument(document: string): Promise<User | null> {
        throw new Error('Method not implemented.');
    }
    findById(id: string): Promise<User | null> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
