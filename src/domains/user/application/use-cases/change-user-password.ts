import { Either, left, right } from "@/core/either";
import { UserRepository } from "../../domain/repository/user-repository";
import { Encrypt } from "../util/encrypt";

interface ChangeUserPasswordDTO{
    userId: string;
    oldPassword: string;
    newPassword: string;
}
type ChangeUserPasswordResponse = Promise<Either<Error, void>>;

export class ChangeUserPassword{
    constructor(private readonly userRepository: UserRepository){}
    async execute(data: ChangeUserPasswordDTO): ChangeUserPasswordResponse{
        const user = await this.userRepository.findById(data.userId);
        if(!user){
            return left(new Error('User not found'));
        }
        if (!user.isAdmin()) { 
            return left(new Error('User is not an admin'));
        }
        if(!(await Encrypt.compare(data.oldPassword, user.password))){
            return left(new Error('Old password is incorrect'));
        }
        user.password = await Encrypt.genHash(data.newPassword);
        await this.userRepository.save(user);
        return right(undefined);
    }
}