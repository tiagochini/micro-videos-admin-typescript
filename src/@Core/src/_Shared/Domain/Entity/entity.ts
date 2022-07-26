import UniqueEntityId from "../ValueObjects/unique-entity-id.vo";

export abstract class Entity<Props = any>{
    public readonly UniqueEntityId: UniqueEntityId;

    constructor(public readonly props: Props, id?: UniqueEntityId) {
        this.UniqueEntityId = id || new UniqueEntityId();
    }

    get id(): string {
        return this.UniqueEntityId.value;
    }

    toJSON(): Required<{ id: string } & Props> {
        return {
            id: this.id,
            ...this.props
        } as Required<{ id: string } & Props>
    }
}

export default Entity;