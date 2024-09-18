import { RecipientRepository } from '@/database/repositories/recipient-repository';
import { Recipient } from '@/domains/recipient/domain/entities/recipient';

export class InMemoryRecipientRepository extends RecipientRepository {
    public recipients: Recipient[] = [];

    async findByID(id: string): Promise<Recipient | null> {
        return this.recipients.find((p) => p.id.toString() === id) || null;
    }
    findByDocument(document: string): Recipient | null {
        return this.recipients.find((p) => p.document === document) || null;
    }
    findByEmail(email: string): Recipient | null {
        return this.recipients.find((p) => p.email === email) || null;
    }

    async save(data: Recipient): Promise<void> {
        this.recipients.push(data);
    }
    async update(data: Recipient): Promise<void> {
        const index = this.recipients.findIndex(
            (p) => p.id.toString() === data.id.toString(),
        );
        if (index === -1) throw new Error('Recipient not found');
        this.recipients[index] = data;
    }
}
