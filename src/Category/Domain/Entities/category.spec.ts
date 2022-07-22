import Category, { CategoryProperties } from './category';
import { omit } from 'lodash';
import UniqueEntityId from '../../../_Shared/Domain/ValueObjects/unique-entity-id.vo';

describe('Entity Category', () => {


    beforeEach(() => {
        Category.validate = jest.fn();
    });

    it('constructor of category', () => {
        let category = new Category({ name: 'Movie' });
        let props = omit(category.props, 'created_at');
        expect(Category.validate).toHaveBeenCalled();
        expect(props).toStrictEqual({
            name: 'Movie',
            description: null,
            is_active: true
        });
        expect(category.created_at).toBeInstanceOf(Date);

        category = new Category({ name: 'Movie', description: 'Movie description' });
        expect(Category.validate).toHaveBeenCalled();
        props = omit(category.props, 'created_at');
        expect(props).toStrictEqual({
            name: 'Movie',
            description: 'Movie description',
            is_active: true
        });
        expect(category.created_at).toBeInstanceOf(Date);

        category = new Category({ name: 'Movie', description: 'Movie description', is_active: false });
        expect(Category.validate).toHaveBeenCalled();
        props = omit(category.props, 'created_at');
        expect(props).toStrictEqual({
            name: 'Movie',
            description: 'Movie description',
            is_active: false
        });
        expect(category.created_at).toBeInstanceOf(Date);

        const created_at = new Date();
        category = new Category({ name: 'Movie', description: 'Movie description', is_active: false, created_at: created_at });
        expect(Category.validate).toHaveBeenCalled();
        expect(category.props).toStrictEqual({
            name: 'Movie',
            description: 'Movie description',
            is_active: false,
            created_at: created_at
        });
        expect(category.created_at).toBeInstanceOf(Date);
    });

    it('test id field', () => {
        type CategoryData = { props: CategoryProperties, id?: UniqueEntityId };

        const data: CategoryData[] = [
            { props: { name: 'Movie' } },
            { props: { name: 'Movie' }, id: null },
            { props: { name: 'Movie' }, id: undefined },
            { props: { name: 'Movie' }, id: new UniqueEntityId('b826de14-8c48-4c55-b140-2ba0496e32c4') },
        ];

        data.forEach(item => {
            const category = new Category(item.props, item.id as any);
            expect(Category.validate).toHaveBeenCalled();
            expect(category.id).not.toBeNull();
        });
    });

    it('getter of name field', () => {
        let category = new Category({ name: 'Movie' });
        expect(Category.validate).toBeCalledTimes(1);
        expect(category.name).toBe('Movie');
        expect(category.description).toBeNull();
    });

    it('getter of description field', () => {
        let category = new Category({ name: 'Movie', description: 'Movie description' });
        expect(Category.validate).toBeCalledTimes(1);
        expect(category.name).toBe('Movie');
        expect(category.description).toBe('Movie description');
    });

    it('getter of is_active field', () => {
        let category = new Category({ name: 'Movie', is_active: false });
        expect(Category.validate).toBeCalledTimes(1);
        expect(category.name).toBe('Movie');
        expect(category.is_active).toBe(false);

        category = new Category({ name: 'Movie', is_active: true });
        expect(Category.validate).toHaveBeenCalled();
        expect(category.name).toBe('Movie');
        expect(category.is_active).toBeTruthy();

        category = new Category({ name: 'Movie', is_active: null });
        expect(Category.validate).toHaveBeenCalled();
        expect(category.name).toBe('Movie');
        expect(category.is_active).toBeTruthy();
    });

    it('getter of created_at field', () => {
        let category = new Category({ name: 'Movie' });
        expect(Category.validate).toHaveBeenCalled();
        expect(category.name).toBe('Movie');
        expect(category.created_at).toBeInstanceOf(Date);

        let created_at = new Date();
        category = new Category({ name: 'Movie', created_at: created_at });
        expect(Category.validate).toHaveBeenCalled();
        expect(category.name).toBe('Movie');
        expect(category.created_at).toBeInstanceOf(Date);
        expect(category.created_at).toStrictEqual(created_at);
    });

});