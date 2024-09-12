import { PackageRepository } from '@/database/repositories/package-repository';
import { RecipientRepository } from '@/database/repositories/recipient-repository';
import { CreatePackage } from './create-package';
import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository';
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository';
import { Recipient } from '@/domains/recipient/domain/entities/recipient';

describe('Test create package use case', () => {
    let createPackage: CreatePackage;
    let packageRepository: InMemoryPackageRepository;
    let recipientRepository: InMemoryRecipientRepository;
    beforeEach(() => {
        packageRepository = new InMemoryPackageRepository();
        recipientRepository = new InMemoryRecipientRepository();
        createPackage = new CreatePackage(
            packageRepository,
            recipientRepository,
        );
    });
    it('Should create a package', async () => {
        const recipient = Recipient.create({
            name: 'Name',
            document: 'Document',
            email: 'Email',
            address: 'Address',
        });

        await recipientRepository.save(recipient);
        const response = await createPackage.execute({
            location: 'Location',
            recipient_id: recipient.id.toString(),
        });
        expect(response.isRight()).toBeTruthy();
    });
    it("Shouldn't create a package if recipient not found", async () => {
        const response = await createPackage.execute({
            location: 'Location',
            recipient_id: '1',
        });
        expect(response.isLeft()).toBeTruthy();
    });
});
