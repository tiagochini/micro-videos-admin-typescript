import UniqueEntityId from "../ValueObjects/unique-entity-id.vo";
import Entity from "./entity";
import { validate as UuidValidade } from 'uuid';

class StubEntity extends Entity<{ prop1: string; prop2: number }> {

}

describe("Entity Unit Test", () => {
    it("should create an instance of Entity", () => {
        const entity = new StubEntity({ prop1: "test", prop2: 1 });
        expect(entity).toBeTruthy();
    });

    it("should set props and id", () => {
        const arrange = { prop1: "test", prop2: 1 };
        const entity = new StubEntity(arrange);
        expect(entity.props).toStrictEqual(arrange);
        expect(entity.UniqueEntityId).toBeInstanceOf(UniqueEntityId);
        expect(entity.id).not.toBeNull();
        expect(UuidValidade(entity.id)).toBeTruthy();
    });

    it("should accept a valid uuid", () => { 
        const arrange = { prop1: "test", prop2: 1 };
        const uniqueEntityId = new UniqueEntityId();
        const entity = new StubEntity(arrange, uniqueEntityId);
        expect(entity.id).not.toBeNull();
        expect(UuidValidade(entity.id)).toBeTruthy();
        expect(entity.id).toBe(uniqueEntityId.value);
    });

    it('should convert to json', () => {
        const arrange = { prop1: "test", prop2: 1 };
        const uniqueEntityId = new UniqueEntityId();
        const entity = new StubEntity(arrange, uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual({
            id: entity.id,
            ...arrange
        });
    });

});