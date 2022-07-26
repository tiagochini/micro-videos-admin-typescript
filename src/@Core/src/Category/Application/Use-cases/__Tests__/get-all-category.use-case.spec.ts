import Category from "../../../../Category/Domain/Entities/category";
import CategoryRepository from "../../../../Category/Domain/Repository/category.repository";
import CategoryInMemoryRepository from "../../../../Category/Infra/Repository/category-in-memory.repository";
import GetAllCategoryUseCase from "../get-all-category.use-case";

describe('GetAllCategoryUseCase Unit Test', () => {
    let useCase: GetAllCategoryUseCase.UseCase;
    let categoryRepository: CategoryRepository.Repository;
    let items: Category[] = [];

    beforeEach(() => {
        categoryRepository = new CategoryInMemoryRepository;
        useCase = new GetAllCategoryUseCase.UseCase(categoryRepository);
    });

    it('should get category not found', async () => {
        const spy = jest.spyOn(categoryRepository, 'findAll');
        const input = {};

        try {
            await useCase.execute();
        }
        catch (error: any) {
            expect(spy).toHaveBeenCalledTimes(1);
            expect(error.message).toBe('Entity not found using id: invalid-id');
        }
    });

    it('should category find by id', async () => {
        items = [
            new Category({ name: 'Category 1', description: 'Description 1', is_active: true }),
            new Category({ name: 'Category 2', description: 'Description 2', is_active: true }),
            new Category({ name: 'Category 3', description: 'Description 3', is_active: true }),
        ];

        items.forEach(item => categoryRepository.insert(item));

        const spy = jest.spyOn(categoryRepository, 'findAll');
        const input = {};

        const output = await useCase.execute();

        expect(output.length).toBe(3);
        let index: number = 0;
        output.forEach(item => {
            expect(item).toMatchObject(items[index].toJSON())
            index++;
        });
        expect(spy).toHaveBeenCalledTimes(1);
    });


});