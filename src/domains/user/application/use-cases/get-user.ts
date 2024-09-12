import { Either, left, right } from "@/core/either";
import { UserRepository } from "../../domain/repository/user-repository";
import { User } from "../../domain/entities/user";

interface GetUserDTO{
    id: string;
}

type GetUserResponse = Promise<Either<null, User>>;

export class GetUser {
    constructor(private readonly userRepository: UserRepository) {}
    async execute(data: GetUserDTO) : GetUserResponse {
        const user = await this.userRepository.findById(data.id);
        console.log(user);
        return user ? Promise.resolve(right(user)) : Promise.resolve(left(null));
    }
}