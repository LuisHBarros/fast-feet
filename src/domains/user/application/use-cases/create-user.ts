import { UserRepository } from '@/database/repositories/user-repository';
import { Either, left, right } from '../../../../core/either';
import { User } from '../../domain/entities/user';
import { Encrypt } from '../util/encrypt';

interface CreateUserDTO {
    name: string;
    document: string;
    password: string;
}

type CreateUserResponse = Promise<Either<Error, void>>;

export class CreateUser {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(user: CreateUserDTO): CreateUserResponse {
        const userAlreadyExists = await this.userRepository.findByDocument(
            user.document,
        );
        if (userAlreadyExists) {
            return left(new Error('User already exists'));
        }
        const hashedPassword = await Encrypt.genHash(user.password);
        const newUser = User.create({
            name: user.name,
            document: user.document,
            password: hashedPassword,
            role: 'deliveryman',
        });
        await this.userRepository.save(newUser);
        return right(undefined);
    }
}
