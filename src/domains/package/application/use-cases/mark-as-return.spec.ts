import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository';
import { MarkAsReturn } from './mark-as-return';
import { Package } from '../../domain/entities/package';
import { UniqueEntityID } from '@/core/entity/unique-entity-id';

describe('test mark as return use case', () => {
    let markAsReturn: MarkAsReturn;
    let packageRepository: InMemoryPackageRepository;
    beforeEach(() => {
        packageRepository = new InMemoryPackageRepository();
        markAsReturn = new MarkAsReturn(packageRepository);
    });
    it('should mark a package as return', async () => {
        const packageEntity = Package.create({
            recipient_id: new UniqueEntityID(),
            location: 'Some location',
            post: new Date(),
            status: 'delivered',
        });
        await packageRepository.save(packageEntity);
        const response = await markAsReturn.execute({
            package_id: packageEntity.id.value,
        });
        expect(response.isRight()).toBeTruthy();
        if (response.isRight()) {
            expect(packageRepository.packages[0].status).toBe('return');
        }
    });
    it('should not mark a package as return if it does not exist', async () => {
        const response = await markAsReturn.execute({
            package_id: '1',
        });
        expect(response.isLeft()).toBeTruthy();
    });
});
