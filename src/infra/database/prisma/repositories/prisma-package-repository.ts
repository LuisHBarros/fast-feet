import { PackageRepository } from '@/database/repositories/package-repository';
import { Package } from '@/domains/package/domain/entities/package';

export class PrismaPackageRepository implements PackageRepository {
    findAll(): Promise<Package[]> {
        throw new Error('Method not implemented.');
    }
    save(data: Package): Promise<void> {
        throw new Error('Method not implemented.');
    }
    findByID(id: string): Promise<Package | null> {
        throw new Error('Method not implemented.');
    }
    update(data: Package): Promise<void> {
        throw new Error('Method not implemented.');
    }
    findByDeliveryManId(id: string): Promise<Package[]> {
        throw new Error('Method not implemented.');
    }
}
