import { RecipientRepository } from '@/database/repositories/recipient-repository';
import { Recipient } from '../../domain/entities/recipient';
import { Either, left, right } from '@/core/either';

interface CreateRecipientDTO {
    name: string;
    document: string;
    email: string;
    address: string;
}

type CreateRecipientResponse = Promise<Either<Error, void>>;

export class CreateRecipient {
    constructor(private readonly recipientRepository: RecipientRepository) {}
    async execute({
        name,
        document,
        email,
        address,
    }: CreateRecipientDTO): CreateRecipientResponse {
        if (this.recipientRepository.findByDocument(document)) {
            return left(new Error('Recipient already exists'));
        }
        if (this.recipientRepository.findByEmail(email)) {
            return left(new Error('Invalid email'));
        }
        const recipient = Recipient.create({
            name,
            document,
            email,
            address,
        });
        await this.recipientRepository.save(recipient);
        return right(undefined);
    }
}
