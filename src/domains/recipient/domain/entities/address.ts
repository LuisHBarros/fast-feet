import { Entity } from '@/core/entity/entity';
import { UniqueEntityID } from '@/core/entity/unique-entity-id';

interface AddressProps {
    street: string;
    number: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    recipientId: string;
}

export class Address extends Entity<AddressProps> {
    get street(): string {
        return this.props.street;
    }

    get number(): string {
        return this.props.number;
    }

    get city(): string {
        return this.props.city;
    }

    get state(): string {
        return this.props.state;
    }

    get postalCode(): string {
        return this.props.postalCode;
    }
    get country(): string {
        return this.props.country;
    }
    get latitude(): number {
        return this.props.latitude;
    }
    get longitude(): number {
        return this.props.longitude;
    }
    get recipientId(): string {
        return this.props.recipientId;
    }

    public static create(props: AddressProps, id?: string): Address {
        return new Address(
            props,
            id ? new UniqueEntityID(id) : new UniqueEntityID(),
        );
    }
}
