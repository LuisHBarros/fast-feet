import { Recipient } from '../../domain/entities/recipient';
import { CreateRecipient } from './create-recipient';
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository';

describe('test create recipient use case', () => {
    let createRecipientUseCase: CreateRecipient;
    let recipientRepository: InMemoryRecipientRepository;
    beforeEach(() => {
        recipientRepository = new InMemoryRecipientRepository();
        createRecipientUseCase = new CreateRecipient(recipientRepository);
    });
    it('should create a recipient', async () => {
        const response = await createRecipientUseCase.execute({
            name: 'John Doe',
            document: '12345678901',
            email: 'john.doe@mail.com',
            address: 'John Doe Street',
        });
        expect(response.isRight()).toBeTruthy();
        expect(recipientRepository.recipients.length).toBe(1);
        expect(recipientRepository.recipients[0].name).toBe('John Doe');
    });
    it('should not create a recipient with an email already in use', async () => {
        const recipient = Recipient.create({
            name: 'John Doe',
            document: '12345678901',
            email: 'john.doe@email.com',
            address: 'John Doe Street',
        });
        await recipientRepository.save(recipient);
        const response = await createRecipientUseCase.execute({
            name: 'John Doe 2',
            document: '0123456789',
            email: recipient.email,
            address: 'John Doe Street 2',
        });
        expect(response.isLeft()).toBeTruthy();
    });
    it('should not create a recipient with a document already in use', async () => {
        const recipient = Recipient.create({
            name: 'John Doe',
            document: '12345678901',
            email: 'john.doe@mail.com',
            address: 'John Doe Street',
        });
        await recipientRepository.save(recipient);
        const response = await createRecipientUseCase.execute({
            name: 'John Doe 2',
            document: recipient.document,
            email: 'john.doe2@mail.com',
            address: 'John Doe Street 2',
        });
        expect(response.isLeft()).toBeTruthy();
    });
});
