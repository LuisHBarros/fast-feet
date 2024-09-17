import { Either, right } from '@/core/either';
import { Package } from '@/domains/package/domain/entities/package';

interface GetPackagesByUserDTO {}

type GetPackagesByUserResponse = Either<Error, Package[]>;

export class GetPackagesByUser {
    constructor() {}
    execute(dto: GetPackagesByUserDTO): GetPackagesByUserResponse {
        return right([]);
    }
}
