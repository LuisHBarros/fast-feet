import { randomUUID } from 'crypto';

export class UniqueEntityID {
    private readonly _value: string;

    constructor(id?: string) {
        this._value = id || UniqueEntityID.createRandomID();
    }

    get value(): string {
        return this._value;
    }

    private static createRandomID(): string {
        return randomUUID();
    }
}
