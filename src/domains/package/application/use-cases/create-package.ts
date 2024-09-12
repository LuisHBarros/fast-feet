import { Either, left, right } from '@/core/either';
import { Package } from '../../domain/entities/package';
import { UniqueEntityID } from '@/core/entity/unique-entity-id';
import { PackageRepository } from '@/database/repositories/package-repository';
import { RecipientRepository } from '@/database/repositories/recipient-repository';

interface CreatePackageDTO {
    location: string;
    recipient_id: string;
}

type CreatePackageResponse = Promise<Either<Error, void>>;

export class CreatePackage {
    constructor(
        private readonly packageRepository: PackageRepository,
        private readonly recipientRepository: RecipientRepository,
    ) {}

    async execute(data: CreatePackageDTO): CreatePackageResponse {
        if (!(await this.recipientRepository.findByID(data.recipient_id))) {
            return left(new Error('Recipient not found'));
        }
        const pkg = Package.create({
            location: data.location,
            post: new Date(),
            recipient_id: new UniqueEntityID(data.recipient_id),
            status: 'pending',
        });
        await this.packageRepository.save(pkg);
        return right(undefined);
    }
}
