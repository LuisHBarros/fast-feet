import { Entity } from '@/core/entity/entity';
import { UniqueEntityID } from '@/core/entity/unique-entity-id';

interface RecipientProps {
    name: string;
    document: string;
    email: string;
    address: string;
    // address: UniqueEntityID;
}

export class Recipient extends Entity<RecipientProps> {
    get name(): string {
        return this.props.name;
    }

    get document(): string {
        return this.props.document;
    }

    get email(): string {
        return this.props.email;
    }

    get address(): string {
        return this.props.address;
    }

    public static create(props: RecipientProps, id?: string): Recipient {
        return new Recipient(
            props,
            id ? new UniqueEntityID(id) : new UniqueEntityID(),
        );
    }
}
