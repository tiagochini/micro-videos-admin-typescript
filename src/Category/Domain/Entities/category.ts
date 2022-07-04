import Entity from '../../../_Shared/Domain/Entity/entity';
import UniqueEntityId from '../../../_Shared/Domain/ValueObjects/unique-entity-id.vo';

export type CategoryProperties = {
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: Date;
};

export type CategoryUpdate = {
    name: string;
    description?: string;
}

export default class Category extends Entity<CategoryProperties> {
    
    constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
        super(props, id);
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

    update(props: CategoryUpdate): Category {
        this.props.name = props.name ?? this.props.name;
        this.props.description = props.description ?? this.props.description;

        return this;
    }

    activate(): Category {
        this.props.is_active = true;
        return this;
    }

    deactivate(): Category {
        this.props.is_active = false;
        return this;
    }

}
