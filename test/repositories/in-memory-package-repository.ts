import { PackageRepository } from '@/database/repositories/package-repository';
import { Package } from '@/domains/package/domain/entities/package';

export class InMemoryPackageRepository implements PackageRepository {
    private packages: Package[] = [];

    async findByID(id: string): Promise<Package | null> {
        return this.packages.find((p) => p.id.toString() === id) || null;
    }

    async save(data: Package): Promise<void> {
        this.packages.push(data);
    }
    async update(data: Package): Promise<void> {
        const index = this.packages.findIndex(
            (p) => p.id.toString() === data.id.toString(),
        );
        if (index === -1) throw new Error('Package not found');
        this.packages[index] = data;
    }
}
