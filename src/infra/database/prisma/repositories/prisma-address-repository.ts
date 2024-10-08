import { AddressRepository } from '@/database/repositories/address-repository';
import { Address } from '@/domains/recipient/domain/entities/address';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service';

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
    constructor(private prisma: PrismaService) {}
    async findByID(id: string): Promise<Address | null> {
        const address = await this.prisma.address.findByID({ id });
        if (!address) return null;
        return address;
    }
    async findByRecipientID(recipientId: string): Promise<Address | null> {
        throw new Error('Method not implemented.');
    }
    async save(data: Address): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async update(data: Address): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
