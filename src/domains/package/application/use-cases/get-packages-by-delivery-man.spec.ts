import { PackageRepository } from '@/database/repositories/package-repository';
import { GetPackagesByDeliveryMan } from './get-packages-by-delivery-man';
import { InMemoryPackageRepository } from 'test/repositories/in-memory-package-repository';
import { Package } from '../../domain/entities/package';
import { UniqueEntityID } from '@/core/entity/unique-entity-id';

describe('GetPackagesByDeliveryMan', () => {
    let getPackagesByDeliveryMan: GetPackagesByDeliveryMan;
    let packageRepository: PackageRepository;
    beforeEach(() => {
        packageRepository = new InMemoryPackageRepository();
        getPackagesByDeliveryMan = new GetPackagesByDeliveryMan(
            packageRepository,
        );
    });
    it('should return an empty array', async () => {
        const result = await getPackagesByDeliveryMan.execute({ user_id: '1' });
        expect(result.isRight()).toBeTruthy();
        expect(result.value).toEqual([]);
    });
    it('should return an array with one package', async () => {
        const pack = Package.create({
            location: 'location',
            post: new Date(),
            recipient_id: new UniqueEntityID(),
            status: 'pending',
        });
        pack.delivery_man_id = new UniqueEntityID();
        console.log('package ' + pack.delivery_man_id);
        packageRepository.save(pack);
        const result = await getPackagesByDeliveryMan.execute({
            user_id: pack.delivery_man_id.value,
        });
        expect(result.isRight()).toBeTruthy();
        expect(result.value).toHaveLength(1);
        expect(result.value[0].id).toEqual(pack.id);
    });
});
