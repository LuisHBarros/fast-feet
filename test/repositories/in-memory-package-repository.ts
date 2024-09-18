import { PackageRepository } from '@/database/repositories/package-repository';
import { Package } from '@/domains/package/domain/entities/package';

export class InMemoryPackageRepository implements PackageRepository {
    private packages: Package[] = [];

    async findAll(): Promise<Package[]> {
        return this.packages;
    }

    async findByID(id: string): Promise<Package | null> {
        console.log(
            'ids',
            this.packages.map((p) => p.id.value),
        );
        console.log('id', id);
        return this.packages.find((p) => p.id.value === id) || null;
    }

    async save(data: Package): Promise<void> {
        this.packages.push(data);
    }
    async update(data: Package): Promise<void> {
        console.log(
            'ids',
            this.packages.map((p) => p.id.value),
        );
        const index = this.packages.findIndex(
            (p) => p.id.toString() === data.id.toString(),
        );

        if (index === -1) throw new Error('Package not found');
        this.packages[index] = data;
    }
    findByDeliveryManId(id: string): Promise<Package[]> {
        return Promise.resolve(
            this.packages.filter((p) => p.delivery_man_id?.value === id),
        );
    }
}
