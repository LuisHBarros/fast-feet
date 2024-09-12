import { Entity } from '@/core/entity/entity';
import { UniqueEntityID } from '@/core/entity/unique-entity-id';

interface AddressProps {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zip: string;
}

export class Address extends Entity<AddressProps> {
    get street(): string {
        return this.props.street;
    }

    get number(): string {
        return this.props.number;
    }

    get complement(): string {
        return this.props.complement;
    }

    get city(): string {
        return this.props.city;
    }

    get state(): string {
        return this.props.state;
    }

    get zip(): string {
        return this.props.zip;
    }

    public static create(props: AddressProps, id?: string): Address {
        return new Address(
            props,
            id ? new UniqueEntityID(id) : new UniqueEntityID(),
        );
    }
}
