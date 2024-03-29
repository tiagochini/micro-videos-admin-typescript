import InvalidUuidError from '../Errors/invalid-uuid.error';
import { v4 as uuid, validate as uuidValidator } from 'uuid';
import ValueObject from './value-objects';

export class UniqueEntityId extends ValueObject<string>{

    constructor(readonly id?: string) {
        super(id || uuid());
        this.validate();
    }

    private validate() {
        const isValid = uuidValidator(this.value);
        if(!isValid) {
            throw new InvalidUuidError();
        }
    }

}

export default UniqueEntityId;