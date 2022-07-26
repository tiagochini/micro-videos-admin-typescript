import Entity from "../../Entity/entity";
import NotFoundError from "../../Errors/not-found.error";
import UniqueEntityId from "../../ValueObjects/unique-entity-id.vo";
import { InMemoryRepository } from "../in-memory.repository";

type StrubEntityProps = {
    name: string;
    price: number;
}

class StubEntity extends Entity<StrubEntityProps> {

}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {

}

describe('InMemoryRepository unit test', () => {
    let repository: StubInMemoryRepository;

    beforeEach(() => {
        repository = new StubInMemoryRepository();
    });

    it('should inserts a new entity', async () => {
        const entity = new StubEntity({ name: 'test', price: 1 });
        await repository.insert(entity);
        expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });

    it('should tjrpw error when entity not found', async () => {
        expect(() => repository.findById('fake_id')).rejects.toThrow(
            new NotFoundError('Entity not found using id: fake_id')
        );

        expect(() => repository.findById(new UniqueEntityId('b826de14-8c48-4c55-b140-2ba0496e32c4'))).rejects.toThrow(
            new NotFoundError('Entity not found using id: b826de14-8c48-4c55-b140-2ba0496e32c4')
        );
    });


    it('should find an entity by id', async () => {
        const entity = new StubEntity({ name: 'test', price: 1 });
        await repository.insert(entity);
        const foundEntity = await repository.findById(entity.id);
        expect(foundEntity.toJSON()).toStrictEqual(entity.toJSON());
    });


    it('should find all entities', async () => {
        const entity1 = new StubEntity({ name: 'test', price: 1 });
        const entity2 = new StubEntity({ name: 'test2', price: 2 });
        await repository.insert(entity1);
        await repository.insert(entity2);
        const foundEntities = await repository.findAll();
        expect(foundEntities.length).toBe(2);
    });

    it('should throw error update when entity not found', async () => {
        const entity = new StubEntity({ name: 'test', price: 1 });
        expect(() => repository.update(entity)).rejects.toThrow(
            new NotFoundError(`Entity not found using id: ${entity.id}`)
        );
    });

    it('should update an entity', async () => {
        const entity = new StubEntity({ name: 'test', price: 1 });
        await repository.insert(entity);
        const updatedEntity = new StubEntity(
            { name: 'test2', price: 2 }, entity.UniqueEntityId
        );
        await repository.update(updatedEntity);
        const foundEntity = await repository.findById(entity.id);
        expect(foundEntity.toJSON()).toStrictEqual(updatedEntity.toJSON());
    });


    it('should throw error delete when entity not found', async () => {
        expect(() => repository.delete('fake_id')).rejects.toThrow(
            new NotFoundError('Entity not found using id: fake_id')
        );

        expect(() => repository.delete(new UniqueEntityId('b826de14-8c48-4c55-b140-2ba0496e32c4'))).rejects.toThrow(
            new NotFoundError('Entity not found using id: b826de14-8c48-4c55-b140-2ba0496e32c4')
        );
    });

    it('should delete an entity', async () => {
        const entity = new StubEntity({ name: 'test', price: 1 });
        await repository.insert(entity);
        await repository.delete(entity.id);
        expect(repository.items).toHaveLength(0);

        await repository.insert(entity);
        await repository.delete(entity.UniqueEntityId);
        expect(async () => { await repository.findById(entity.id) }).rejects.toThrow(
            new NotFoundError(`Entity not found using id: ${entity.id}`)
        );
    });

});