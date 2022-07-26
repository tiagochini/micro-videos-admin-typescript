import Category from "../../../../Category/Domain/Entities/category";
import CategoryRepository from "../../../../Category/Domain/Repository/category.repository";
import CategoryInMemoryRepository from "../../../../Category/Infra/Repository/category-in-memory.repository";
import ListCategoryUseCase from "../list-category.use-case";


const items = [
    new Category({ name: 'Test 1', description: 'Test description 1', is_active: true }),
    new Category({ name: 'Test 2', description: 'Test description 2', is_active: true }),
    new Category({ name: 'Test 3', description: 'Test description 3', is_active: true }),
    new Category({ name: 'Test 4', description: 'Test description 4', is_active: true }),
    new Category({ name: 'Test 5', description: 'Test description 5', is_active: true }),
    new Category({ name: 'Test 6', description: 'Test description 6', is_active: true }),
    new Category({ name: 'Test 7', description: 'Test description 7', is_active: true }),
    new Category({ name: 'Test 8', description: 'Test description 8', is_active: true }),
    new Category({ name: 'Test 9', description: 'Test description 9', is_active: true }),
    new Category({ name: 'Test 10', description: 'Test description 10', is_active: true }),
    new Category({ name: 'Test 11', description: 'Test description 11', is_active: true }),
    new Category({ name: 'Test 12', description: 'Test description 12', is_active: true }),
    new Category({ name: 'Testa 13', description: 'Test description 13', is_active: true }),
    new Category({ name: 'Testb 14', description: 'Test description 14', is_active: true }),
    new Category({ name: 'Testc 15', description: 'Test description 15', is_active: true }),
    new Category({ name: 'Testd 16', description: 'Test description 16', is_active: true }),
]

describe("ListCategoryUseCase Unit Test", () => {
    let useCase: ListCategoryUseCase.UseCase;
    let categoryRepository: CategoryRepository.Repository;

    beforeEach(() => {
        categoryRepository = new CategoryInMemoryRepository;
        useCase = new ListCategoryUseCase.UseCase(categoryRepository);
    });

    it('should not found category paginate', async () => {

        const spy = jest.spyOn(categoryRepository, 'search');
        const input = {
            page: 1,
            per_page: 1,
        };

        const result = await useCase.execute(input);

        expect(result.total).toBe(0);
        expect(result.items).toHaveLength(0);
        expect(result.current_page).toBe(1);
        expect(result.per_page).toBe(1);
        expect(result.sort).toBeNull();
        expect(result.sort_dir).toBe('asc');
        expect(result.filter).toBeNull();
        expect(spy).toHaveBeenCalledTimes(1);

    });

    it('should category paginate is not params', async () => {
        items.forEach(item => categoryRepository.insert(item));
        const spy = jest.spyOn(categoryRepository, 'search');
        const input = {
        };

        const result = await useCase.execute(input);

        expect(result.total).toBe(16);
        expect(result.items).toHaveLength(15);
        expect(result.current_page).toBe(1);
        expect(result.per_page).toBe(15);
        expect(result.sort).toBeNull();
        expect(result.sort_dir).toBe('asc');
        expect(result.filter).toBeNull();
        expect(spy).toHaveBeenCalledTimes(1);

    });

    it('should category paginate is params', async () => {
        items.forEach(item => categoryRepository.insert(item));
        const spy = jest.spyOn(categoryRepository, 'search');
        const input = {
            page: 1,
            per_page: 1,
            sort: 'name',
            sort_dir: 'desc',
            filter: 'Test'
        };
        
        //@ts-ignore
        const result = await useCase.execute(input);

        expect(result.total).toBe(16);
        expect(result.items).toHaveLength(1);
        expect(result.current_page).toBe(1);
        expect(result.per_page).toBe(1);
        expect(result.sort).toBe('name');
        expect(result.sort_dir).toBe('desc');
        expect(result.filter).toBe('Test');
        expect(spy).toHaveBeenCalledTimes(1);

    });

    it('should category paginate is params', async () => {
        items.forEach(item => categoryRepository.insert(item));
        const spy = jest.spyOn(categoryRepository, 'search');
        const input = {
            page: 2,
            per_page: 10,
            sort: 'name',
            sort_dir: 'desc',
            filter: 'Test'
        };

        const result = await useCase.execute(input as any);

        expect(result.total).toBe(16);
        expect(result.items).toHaveLength(6);
        expect(result.current_page).toBe(2);
        expect(result.per_page).toBe(10);
        expect(result.sort).toBe('name');
        expect(result.sort_dir).toBe('desc');
        expect(result.filter).toBe('Test');
        expect(spy).toHaveBeenCalledTimes(1);

    });

});