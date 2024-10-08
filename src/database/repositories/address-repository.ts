import { Address } from '@/domains/recipient/domain/entities/address';

export abstract class AddressRepository {
    abstract findByID(id: string): Promise<Address | null>;
    abstract findByRecipientID(recipientId: string): Promise<Address | null>;
    abstract save(data: Address): Promise<void>;
    abstract update(data: Address): Promise<void>;
}
