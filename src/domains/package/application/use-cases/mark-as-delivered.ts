import { Either, left, right } from '@/core/either';
import { Package } from '../../domain/entities/package';
import { PackageRepository } from '@/database/repositories/package-repository';

interface MarkAsDeliveredDTO {
    package_id: string;
    photo: string; // need to implement photo upload
}
type MarkAsDeliveredResponse = Promise<Either<Error, Package>>;

export class MarkAsDelivered {
    constructor(private readonly packageRepository: PackageRepository) {}
    async execute(dto: MarkAsDeliveredDTO): MarkAsDeliveredResponse {
        const packageEntity = await this.packageRepository.findByID(
            dto.package_id,
        );
        if (!packageEntity) {
            return left(new Error('Package not found'));
        }
        packageEntity.status = 'delivered';
        packageEntity.delivery = new Date();
        await this.packageRepository.update(packageEntity);
        return right(packageEntity);
    }
}
