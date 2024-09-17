import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository';
import { MarkAsPickedUp } from './mark-as-picked-up';
import { UniqueEntityID } from '@/core/entity/unique-entity-id';
import { Package } from '../../domain/entities/package';

describe('test MarkAsPickedUp use case', () => {
    let markAsPickedUp: MarkAsPickedUp;
    let packageRepository: InMemoryPackageRepository;
    beforeAll(() => {
        packageRepository = new InMemoryPackageRepository();
        markAsPickedUp = new MarkAsPickedUp(packageRepository);
    });
    it('should mark package as picked up', async () => {
        const pack = Package.create({
            location: 'location',
            post: new Date(),
            recipient_id: new UniqueEntityID(),
            status: 'pending',
        });
        await packageRepository.save(pack);
        const result = await markAsPickedUp.execute({
            package_id: pack.id.value,
        });
        expect(result.isRight()).toBeTruthy();
        expect(result.value).toEqual('picked-up');
    });
    it('should not mark package as picked up if package not found', async () => {
        const result = await markAsPickedUp.execute({
            package_id: '1',
        });
        expect(result.isLeft()).toBeTruthy();
    });
});
