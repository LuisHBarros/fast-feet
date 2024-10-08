import { Package } from '@/domains/package/domain/entities/package';

export abstract class PackageRepository {
    abstract findAll(): Promise<Package[]>;
    abstract save(data: Package): Promise<void>;
    abstract findByID(id: string): Promise<Package | null>;
    abstract update(data: Package): Promise<void>;
    abstract findByDeliveryManId(id: string): Promise<Package[]>;
}
