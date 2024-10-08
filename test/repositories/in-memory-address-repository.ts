import { AddressRepository } from '@/database/repositories/address-repository';
import { Address } from '@/domains/recipient/domain/entities/address';

export class InMemoryAddressRepository extends AddressRepository {
    public addresses: Address[] = [];

    async findByID(id: string): Promise<Address | null> {
        return this.addresses.find((p) => p.id.toString() === id) || null;
    }
    async findByRecipientID(recipientId: string): Promise<Address | null> {
        return (
            this.addresses.find((p) => p.recipientId.value() === recipientId) ||
            null
        );
    }
    async save(data: Address): Promise<void> {
        this.addresses.push(data);
    }
    async update(data: Address): Promise<void> {
        const index = this.addresses.findIndex(
            (p) => p.id.toString() === data.id.toString(),
        );
        if (index === -1) throw new Error('Address not found');
        this.addresses[index] = data;
    }
}
