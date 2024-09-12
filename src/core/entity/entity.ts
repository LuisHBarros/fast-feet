import { UniqueEntityID } from './unique-entity-id';

export class Entity<Props> {
    private readonly _id: UniqueEntityID;
    protected props: Props;

    get id(): UniqueEntityID {
        return this._id;
    }

    constructor(props: Props, id?: UniqueEntityID) {
        this.props = props;
        this._id = id || new UniqueEntityID();
    }

    public equals(entity?: Entity<Props>): boolean {
        if (this === entity) {
            return true;
        }
        if (entity?._id === this._id) {
            return true;
        }
        return false;
    }
}
