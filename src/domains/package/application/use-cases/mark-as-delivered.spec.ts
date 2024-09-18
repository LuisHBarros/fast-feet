import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository';
import { MarkAsDelivered } from './mark-as-delivered';
import { UniqueEntityID } from '@/core/entity/unique-entity-id';
import { Package } from '../../domain/entities/package';

describe('Test MarkAsDelivered use case', () => {
    let markAsDelivered: MarkAsDelivered;
    let packageRepository: InMemoryPackageRepository;
    beforeAll(() => {
        packageRepository = new InMemoryPackageRepository();
        markAsDelivered = new MarkAsDelivered(packageRepository);
    });
    it('should mark package as delivered', async () => {
        const pack = Package.create({
            location: 'location',
            post: new Date(),
            recipient_id: new UniqueEntityID(),
            status: 'pending',
        });
        await packageRepository.save(pack);
        console.log(
            'package:ÇÇ ' + (await packageRepository.findByID(pack.id.value)),
        );
        const result = await markAsDelivered.execute({
            package_id: pack.id.value,
            photo: 'photo',
        });
        expect(result.isRight()).toBeTruthy();
        if (result.value instanceof Package) {
            expect(result.value.status).toEqual('delivered');
        }
    });
    it('should not mark package as delivered if package not found', async () => {
        const result = await markAsDelivered.execute({
            package_id: '1',
            photo: 'photo',
        });
        expect(result.isLeft()).toBeTruthy();
    });
});
