import { ValidationError } from '../Errors/validation-error';
export default class ValidatorRules {

    private constructor(private value: any, private property: string) {
        this.value = value;
        this.property = property;
    }

    static values(values: any, property: string) {
        return new ValidatorRules(values, property);
    }

    required(): Omit<this, "required"> {
        if (this.value === null || this.value === undefined || this.value === '') {
            throw new ValidationError(`The ${this.property} is required`);
        }

        return this;
    }

    string(): Omit<this, "string"> {
        if (!isEmpty(this.value) && typeof this.value !== 'string') {
            throw new ValidationError(`The ${this.property} must be a string`);
        }
        return this;
    }

    maxLength(max: number = 255): Omit<this, "maxLength"> {
        if (!isEmpty(this.value) && this.value.length > max) {
            throw new ValidationError(`The ${this.property} must be less than ${max} characters`);
        }
        return this;
    }

    minLength(min: number = 3): Omit<this, "minLength"> {
        if (!isEmpty(this.value) && this.value.length < min) {
            throw new ValidationError(`The ${this.property} must be greater than ${min} characters`);
        }
        return this;
    }

    boolean(): Omit<this, "boolean"> {
        if (!isEmpty(this.value) && typeof this.value !== 'boolean') {
            throw new ValidationError(`The ${this.property} must be a boolean`);
        }
        return this;
    }

    number(): Omit<this, "number"> {
        if (!isEmpty(this.value) && typeof this.value !== 'number') {
            throw new ValidationError(`The ${this.property} must be a number`);
        }
        return this;
    }
}

export function isEmpty(value: any): boolean {
    return value === null || value === undefined;
}