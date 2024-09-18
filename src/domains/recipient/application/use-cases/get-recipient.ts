import { Either, left, right } from '@/core/either';
import { RecipientRepository } from '@/database/repositories/recipient-repository';
import { Recipient } from '../../domain/entities/recipient';

interface GetRecipientDTO {
    id: string;
}

type GetRecipientResponse = Promise<Either<Error, Recipient>>;

export class GetRecipient {
    constructor(private readonly recipientRepository: RecipientRepository) {}
    async execute({ id }: GetRecipientDTO): GetRecipientResponse {
        try {
            const recipient = await this.recipientRepository.findByID(id);
            if (!recipient) {
                return left(new Error('Recipient not found'));
            }
            return right(recipient);
        } catch (error) {
            return left(new Error('Internal server error'));
        }
    }
}
