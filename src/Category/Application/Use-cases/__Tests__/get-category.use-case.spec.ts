import Category from "../../../../Category/Domain/Entities/category";
import CategoryRepository from "../../../../Category/Domain/Repository/category.repository";
import CategoryInMemoryRepository from "../../../../Category/Infra/Repository/category-in-memory.repository";
import GetCategoryUseCase from "../get-category.use-case";

describe('GetCategoryUseCase Unit Test', () => {
    let useCase: GetCategoryUseCase;
    let categoryRepository: CategoryRepository.Repository;
    let items: Category[] = [];

    beforeEach(() => {
        categoryRepository = new CategoryInMemoryRepository;
        useCase = new GetCategoryUseCase(categoryRepository);

        items = [
            new Category({ name: 'Category 1', description: 'Description 1', is_active: true }),
            new Category({ name: 'Category 2', description: 'Description 2', is_active: true }),
            new Category({ name: 'Category 3', description: 'Description 3', is_active: true }),
        ];

        items.forEach(item => categoryRepository.insert(item));
    });

    it('should get category not found', async () => {
        const spy = jest.spyOn(categoryRepository, 'findById');
        const input = { id: 'invalid-id' };

        try {
            await useCase.execute(input);
        }
        catch (error: any) {
            expect(spy).toHaveBeenCalledTimes(1);
            expect(error.message).toBe('Entity not found using id: invalid-id');
        }
    });

    it('should category find by id', async () => {

        const arrange = [
            { search: items[0].id, expected: items[0] },
            { search: items[1].id, expected: items[1] },
            { search: items[2].id, expected: items[2] },
        ]

        for (const item of arrange) {
            const spy = jest.spyOn(categoryRepository, 'findById');
            const input = { id: item.search };
            const output = await useCase.execute(input);
            expect(output.id).toBe(item.expected.id);
            expect(output.name).toBe(item.expected.name);
            expect(output.description).toBe(item.expected.description);
            expect(output.is_active).toBe(item.expected.is_active);
            expect(output.created_at).toBe(item.expected.created_at);
            expect(spy).toHaveBeenCalled();
        }
    });


});