import { Recipient } from '@/domains/recipient/domain/entities/recipient';

export abstract class RecipientRepository {
    abstract save(data: Recipient): Promise<void>;
    abstract findByID(id: string): Promise<Recipient | null>;
    abstract update(data: Recipient): Promise<void>;
}
