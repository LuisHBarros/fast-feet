import { Either, left, right } from '@/core/either';
import { PackageRepository } from '@/database/repositories/package-repository';
import { Package } from '../../domain/entities/package';

interface MarkAsReturnDTO {
    package_id: string;
}

type MarkAsReturnResponse = Promise<Either<Error, Package>>;

export class MarkAsReturn {
    constructor(private readonly packageRepository: PackageRepository) {}
    async execute(dto: MarkAsReturnDTO): MarkAsReturnResponse {
        const packageEntity = await this.packageRepository.findByID(
            dto.package_id,
        );
        if (!packageEntity) {
            console.log('Package not found really');
            return left(new Error('Package not found'));
        }
        packageEntity.status = 'return';
        packageEntity.pickUp = new Date();
        await this.packageRepository.update(packageEntity);
        return right(packageEntity);
    }
}
