import { Either, left, right } from '@/core/either';
import { PackageRepository } from '@/database/repositories/package-repository';
import { Package } from '../../domain/entities/package';

interface MarkAsPickedUpDTO {
    package_id: string;
}

type MarkAsPickedUpResponse = Promise<Either<Error, Package>>;

export class MarkAsPickedUp {
    constructor(private readonly packageRepository: PackageRepository) {}
    async execute(dto: MarkAsPickedUpDTO): MarkAsPickedUpResponse {
        const packageEntity = await this.packageRepository.findByID(
            dto.package_id,
        );
        if (!packageEntity) {
            return left(new Error('Package not found'));
        }
        packageEntity.status = 'picked-up';
        packageEntity.pickUp = new Date();
        await this.packageRepository.update(packageEntity);
        return right(packageEntity);
    }
}
