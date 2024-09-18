import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository';
import { GetRecipient } from './get-recipient';
import { Recipient } from '../../domain/entities/recipient';

describe('test get recipient use case', () => {
    let getRecipientUseCase: GetRecipient;
    let recipientRepository: InMemoryRecipientRepository;
    beforeEach(() => {
        recipientRepository = new InMemoryRecipientRepository();
        getRecipientUseCase = new GetRecipient(recipientRepository);
    });
    it('should get a recipient', async () => {
        const recipient = Recipient.create({
            name: 'John Doe',
            document: '12345678901',
            email: 'john.doe@mail.com',
            address: 'John Doe Street',
        });
        await recipientRepository.save(recipient);
        const response = await getRecipientUseCase.execute({
            id: recipient.id.toString(),
        });
        expect(response.isRight()).toBeTruthy();
        expect(response.value).toEqual(recipient);
    });
});
