import { Either } from '@/core/either';
import { Package } from '../../domain/entities/package';

interface MarkAsDeliveredDTO {
    package_id: string;
    photo: string;
}

type MarkAsDeliveredResponse = Promise<Either<Error, Package>>;
