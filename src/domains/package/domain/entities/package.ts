import { Entity } from '@/core/entity/entity';
import { UniqueEntityID } from '@/core/entity/unique-entity-id';
import { Optional } from '@/core/types/optional';

interface PackageProps {
    status: 'pending' | 'picked-up' | 'delivered' | 'return';
    post: Date;
    pickUp?: Date | null;
    delivery?: Date | null;
    location: string;
    delivery_man_id: UniqueEntityID | null;
    recipient_id: UniqueEntityID;
}

export class Package extends Entity<PackageProps> {
    get status() {
        return this.props.status;
    }
    get post() {
        return this.props.post;
    }
    get pickUp() {
        return this.props.pickUp || null;
    }
    get delivery() {
        return this.props.delivery || null;
    }
    get location() {
        return this.props.location;
    }
    set status(status: 'pending' | 'picked-up' | 'delivered' | 'return') {
        this.props.status = status;
    }
    set post(post: Date) {
        this.props.post = post;
    }
    set pickUp(pickUp: Date | null) {
        this.props.pickUp = pickUp;
    }
    set delivery(delivery: Date | null) {
        this.props.delivery = delivery;
    }
    set location(location: string) {
        this.props.location = location;
    }
    get delivery_man_id() {
        return this.props.delivery_man_id;
    }
    set delivery_man_id(id: UniqueEntityID | null) {
        this.props.delivery_man_id = id;
    }
    get recipient_id() {
        return this.props.recipient_id;
    }

    static create(
        props: Optional<
            PackageProps,
            'delivery' | 'pickUp' | 'delivery_man_id'
        >,
        id?: string,
    ) {
        return new Package(
            {
                ...props,
                delivery: props.delivery ?? null,
                pickUp: props.pickUp ?? null,
                delivery_man_id: props.delivery_man_id ?? null,
            },
            new UniqueEntityID(id),
        );
    }
}
