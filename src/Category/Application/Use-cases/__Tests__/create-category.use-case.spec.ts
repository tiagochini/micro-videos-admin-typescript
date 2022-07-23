import CategoryRepository from "../../../../Category/Domain/Repository/category.repository";
import CategoryInMemoryRepository from "../../../../Category/Infra/Repository/category-in-memory.repository";
import CreateCategoryUseCase from "../create-category.use-case";

describe('CreateCategoryUseCase Unit Test', () => {
    let useCase: CreateCategoryUseCase;
    let categoryRepository: CategoryRepository.Repository;

    beforeEach(() => {
        categoryRepository = new CategoryInMemoryRepository;
        useCase = new CreateCategoryUseCase(categoryRepository);
    });

    it('should fail creating', async () => {
        const spy = jest.spyOn(categoryRepository, 'insert');
        const input = {
            name: '',
            description: '',
            is_active: false
        };

        try {
            await useCase.execute(input);
        }
        catch (error: any) {
            expect(spy).toHaveBeenCalledTimes(0);
            expect(error.message).toBe('Entity Validation Error');
        }
    });

    it('should create a new category a required', async () => {

        const spy = jest.spyOn(categoryRepository, 'insert');
        const result = await useCase.execute({
            name: 'Test',
        });

        expect(result.id).toBeDefined();
        expect(result.name).toBe('Test');
        expect(result.description).toBeNull();
        expect(result.is_active).toBeTruthy();
        expect(result.created_at).toBeDefined();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should create a new category with description', async () => {
        const spy = jest.spyOn(categoryRepository, 'insert');
        const result = await useCase.execute({
            name: 'Test',
            description: 'Test description',
        });

        expect(result.id).toBeDefined();
        expect(result.name).toBe('Test');
        expect(result.description).toBe('Test description');
        expect(result.is_active).toBeTruthy();
        expect(result.created_at).toBeDefined();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should create a new category with is_active', async () => {
        const spy = jest.spyOn(categoryRepository, 'insert');
        const result = await useCase.execute({
            name: 'Test',
            is_active: false,
        });

        expect(result.id).toBeDefined();
        expect(result.name).toBe('Test');
        expect(result.description).toBeNull();
        expect(result.is_active).toBeFalsy();
        expect(result.created_at).toBeDefined();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should create a new category with description and is_active', async () => {
        const spy = jest.spyOn(categoryRepository, 'insert');
        const result = await useCase.execute({
            name: 'Test',
            description: 'Test description',
            is_active: false,
        });

        expect(result.id).toBeDefined();
        expect(result.name).toBe('Test');
        expect(result.description).toBe('Test description');
        expect(result.is_active).toBeFalsy();
        expect(result.created_at).toBeDefined();
        expect(spy).toHaveBeenCalledTimes(1);
    });

});