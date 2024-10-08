import { RecipientRepository } from '@/database/repositories/recipient-repository';
import { Recipient } from '@/domains/recipient/domain/entities/recipient';

export class PrismaRecipientRepository implements RecipientRepository {
    save(data: Recipient): Promise<void> {
        throw new Error('Method not implemented.');
    }
    findByID(id: string): Promise<Recipient | null> {
        throw new Error('Method not implemented.');
    }
    update(data: Recipient): Promise<void> {
        throw new Error('Method not implemented.');
    }
    findByDocument(document: string): Recipient | null {
        throw new Error('Method not implemented.');
    }
    findByEmail(email: string): Recipient | null {
        throw new Error('Method not implemented.');
    }
}
