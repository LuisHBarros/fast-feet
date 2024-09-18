import { Either, left, right } from '@/core/either';
import { User } from '../../domain/entities/user';
import { UserRepository } from '@/database/repositories/user-repository';

interface GetUserDTO {
    id: string;
}

type GetUserResponse = Promise<Either<null, User>>;

export class GetUser {
    constructor(private readonly userRepository: UserRepository) {}
    async execute(data: GetUserDTO): GetUserResponse {
        const user = await this.userRepository.findById(data.id);
        return user
            ? Promise.resolve(right(user))
            : Promise.resolve(left(null));
    }
}
