import InvalidUuidError from "../Errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";
import { validate as uuidValidator } from "uuid";

function spyValidateMethod() {
    return jest.spyOn(UniqueEntityId.prototype as any, 'validate');
}

describe('Entity UniqueEntityId', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('test fail of constructor is invalid uuid', () => {
        const validateSpy = spyValidateMethod();
        expect(() => {
            new UniqueEntityId('fake_uuid');
        }).toThrow(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalled();
        expect(() => {
            new UniqueEntityId('fake_uuid');
        }).toThrowError('ID must be a valid UUID');
        expect(validateSpy).toHaveBeenCalled();
    });

    it('should accept a uuid passed in constructor', () => {
        const validateSpy = spyValidateMethod();
        const id = new UniqueEntityId('b826de14-8c48-4c55-b140-2ba0496e32c4');
        expect(id.id).not.toBeNull();
        expect(id).toBeInstanceOf(UniqueEntityId);
        expect(id.id.length).toBe(36);
        expect(validateSpy).toHaveBeenCalled();
    });

    it('should accept a uuid not passed in constructor', () => {
        const validateSpy = spyValidateMethod();
        const id = new UniqueEntityId();
        expect(id.id).not.toBeNull();
        expect(id).toBeInstanceOf(UniqueEntityId);
        expect(id.id.length).toBe(36);
        expect(() => uuidValidator(id.id)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });

});