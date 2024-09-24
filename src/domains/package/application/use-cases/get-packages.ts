import { Either, left, right } from '@/core/either';
import { Package } from '../../domain/entities/package';
import { PackageRepository } from '@/database/repositories/package-repository';

interface getPackagesDTO {
    location: string;
}

type getPackagesResponse = Promise<Either<Error, Package[]>>;

export class GetPackages {
    constructor(private readonly packageRepository: PackageRepository) {}
    async execute({ location }: getPackagesDTO): getPackagesResponse {
        const packages = await this.packageRepository.findAll();
        return right(packages);
    }
}
