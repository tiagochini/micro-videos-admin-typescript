import InvalidUuidError from '../../@Shared/Errors/invalid-uuid.error';
import { v4 as uuid, validate as uuidValidator } from 'uuid';

export default class UniqueEntityId {

    constructor(public readonly id?: string) {
        this.id = id || uuid();
        this.validate();
    }

    private validate() {
        const isValid = uuidValidator(this.id);
        if(!isValid) {
            throw new InvalidUuidError();
        }
    }

}