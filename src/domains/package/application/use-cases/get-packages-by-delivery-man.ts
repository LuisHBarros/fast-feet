import { Either, right } from '@/core/either';
import { PackageRepository } from '@/database/repositories/package-repository';
import { Package } from '@/domains/package/domain/entities/package';

interface GetPackagesByUserDTO {
    user_id: string;
}

type GetPackagesByUserResponse = Promise<Either<Error, Package[]>>;

export class GetPackagesByDeliveryMan {
    constructor(private readonly packageRepository: PackageRepository) {}
    async execute(dto: GetPackagesByUserDTO): GetPackagesByUserResponse {
        const packages = await this.packageRepository.findByDeliveryManId(
            dto.user_id,
        );
        return right(packages);
    }
}
