import UniqueEntityId from '../../../@Shared/Domain/unique-entity-id.vo';

export type CategoryProperties = {
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: Date;
};

export default class Category {
    public readonly id: UniqueEntityId;
    constructor(
        public readonly props: CategoryProperties, id?: UniqueEntityId
    ) {
        this.id = id || new UniqueEntityId();
        this.props.description = this.props.description ?? null;
        this.props.is_active = this.props.is_active ?? true;
        this.props.created_at = this.props.created_at ?? new Date();
    }

    get name(): string {
        return this.props.name;
    }

    get description() {
        return this.props.description;
    }

    get is_active() {
        return this.props.is_active;
    }

    get created_at() {
        return this.props.created_at;
    }

}
