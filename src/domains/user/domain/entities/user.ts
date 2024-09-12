import { Entity } from '../../../../core/entity/entity';
import { UniqueEntityID } from '../../../../core/entity/unique-entity-id';
import { Optional } from '../../../../core/types/optional';

interface UserProps {
    name: string;
    document: string;
    password: string;
    createdAt?: Date;
    role: 'admin' | 'deliveryman';
}

export class User extends Entity<UserProps> {
    get name(): string {
        return this.props.name;
    }

    get document(): string {
        return this.props.document;
    }

    get password(): string {
        return this.props.password;
    }
    set password(password: string) {
        this.props.password = password;
    }
    isDeliveryman(): boolean {
        return this.props.role === 'deliveryman';
    }
    isAdmin(): boolean {
        return this.props.role === 'admin';
    }

    public static create(
        props: Optional<UserProps, 'createdAt'>,
        id?: UniqueEntityID,
    ): User {
        return new User(
            {
                ...props,
                createdAt: props.createdAt ?? new Date(),
            },
            id,
        );
    }
}
