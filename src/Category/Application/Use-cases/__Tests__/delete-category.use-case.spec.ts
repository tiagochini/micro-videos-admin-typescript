import Category from "../../../../Category/Domain/Entities/category";
import CategoryRepository from "../../../../Category/Domain/Repository/category.repository";
import CategoryInMemoryRepository from "../../../../Category/Infra/Repository/category-in-memory.repository";
import DeleteCategoryUseCase from "../delete-category.use-case";

describe('DeleteCategoryUseCase Unit Test', () => { 
    let useCase: DeleteCategoryUseCase;
    let categoryRepository: CategoryRepository.Repository;
    let items: Category[] = [];

    beforeEach(() => {
        categoryRepository = new CategoryInMemoryRepository;
        useCase = new DeleteCategoryUseCase(categoryRepository);

        items = [
            new Category({ name: 'Category 1', description: 'Description 1', is_active: true }),
            new Category({ name: 'Category 2', description: 'Description 2', is_active: true }),
            new Category({ name: 'Category 3', description: 'Description 3', is_active: true }),
        ];

        items.forEach(item => categoryRepository.insert(item));
    });

    it('should delete category not found', async () => {
        const spyFind = jest.spyOn(categoryRepository, 'findById');
        const spyDelete = jest.spyOn(categoryRepository, 'delete');
        const input = { id: 'invalid-id' };

        try {
            await useCase.execute(input);
        }
        catch (error: any) {
            expect(spyFind).toHaveBeenCalledTimes(1);
            expect(spyDelete).toHaveBeenCalledTimes(0);
            expect(error.message).toBe('Entity not found using id: invalid-id');
        }
    });

    it('should delete a category', async () => {
        const spy = jest.spyOn(categoryRepository, 'delete');
        const output = await useCase.execute({ id: items[0].id });

        expect(output.success).toBeTruthy();
        expect(spy).toHaveBeenCalledTimes(1);

        const category = await categoryRepository.findAll();
        expect(category.length).toBe(2);
    });


});