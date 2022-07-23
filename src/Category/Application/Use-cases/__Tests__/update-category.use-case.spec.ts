import Category from "../../../../Category/Domain/Entities/category";
import CategoryRepository from "../../../../Category/Domain/Repository/category.repository";
import CategoryInMemoryRepository from "../../../../Category/Infra/Repository/category-in-memory.repository";
import UpdateCategoryUseCase from "../update-category.use-case";

describe("UpdateCategoryUseCase", () => { 
    let useCase: UpdateCategoryUseCase;
    let categoryRepository: CategoryRepository.Repository;
    let items: Category[] = [];

    beforeEach(() => {
        categoryRepository = new CategoryInMemoryRepository;
        useCase = new UpdateCategoryUseCase(categoryRepository);

        items = [
            new Category({ name: 'Category 1', description: 'Description 1', is_active: true }),
            new Category({ name: 'Category 2', description: 'Description 2', is_active: false }),
            new Category({ name: 'Category 3', description: 'Description 3', is_active: true }),
        ];

        items.forEach(item => categoryRepository.insert(item));
    });

    it("should update a category", async () => {
        const input = {
            id: items[0].id,
            name: "Category 1 Updated",
            description: "Description 1 Updated",
        }

        const output = await useCase.execute(input as any);

        expect(output.id).toBe(input.id);
        expect(output.name).toBe(input.name);
        expect(output.description).toBe(input.description);
        expect(output.is_active).toBeTruthy();
    });

    it("should throw an error if category not found", async () => {
        const input = {
            id: "not-found",
            name: "Category 1 Updated",
            description: "Description 1 Updated",
        }

        try {
            await useCase.execute(input as any);
        } catch (error: any) {
            expect(error.message).toBe('Entity not found using id: not-found');
        }
    });

    it("should update a category activate", async () => {
        const input = {
            id: items[1].id,
            is_active: true,
        }       
        expect(items[1].is_active).toBeFalsy();

        const output = await useCase.execute(input as any);
        expect(output.name).toBe(items[1].name);
        expect(output.description).toBe(items[1].description);
        expect(output.id).toBe(input.id);
        expect(output.is_active).toBeTruthy();
    });

    it("should update a category deactivate", async () => {
        const input = {
            id: items[0].id,
            is_active: false,
        }
        expect(items[0].is_active).toBeTruthy();
        const output = await useCase.execute(input as any);
        expect(output.name).toBe(items[0].name);
        expect(output.description).toBe(items[0].description);
        expect(output.id).toBe(input.id);
        expect(output.is_active).toBeFalsy();
    });


    it("should update name and activate", async () => { 
        const input = {
            id: items[1].id,
            name: "Category 1 Updated",
            is_active: true,
        }
        expect(items[1].is_active).toBeFalsy();
        const output = await useCase.execute(input as any);
        expect(output.name).toBe(input.name);
        expect(output.description).toBe(items[1].description);
        expect(output.id).toBe(input.id);
        expect(output.is_active).toBeTruthy();
    });

    it("should update name and deactivate", async () => {
        const input = {
            id: items[0].id,
            name: "Category 1 Updated",
            is_active: false,
        }
        expect(items[0].is_active).toBeTruthy();
        const output = await useCase.execute(input as any);
        expect(output.name).toBe(input.name);
        expect(output.description).toBe(items[0].description);
        expect(output.id).toBe(input.id);
        expect(output.is_active).toBeFalsy();
    });

    it("should update description and activate", async () => {
        const input = {
            id: items[1].id,
            description: "Description 1 Updated",
            is_active: true,
        }
        expect(items[1].is_active).toBeFalsy();
        const output = await useCase.execute(input as any);
        expect(output.name).toBe(items[1].name);
        expect(output.description).toBe(input.description);
        expect(output.id).toBe(input.id);
        expect(output.is_active).toBeTruthy();
    });

    it("should update description and deactivate", async () => {
        const input = {
            id: items[0].id,
            description: "Description 1 Updated",
            is_active: false,
        }
        expect(items[0].is_active).toBeTruthy();
        const output = await useCase.execute(input as any);
        expect(output.name).toBe(items[0].name);
        expect(output.description).toBe(input.description);
        expect(output.id).toBe(input.id);
        expect(output.is_active).toBeFalsy();
    });

    it("should update name, description and activate", async () => {
        const input = {
            id: items[1].id,
            name: "Category 1 Updated",
            description: "Description 1 Updated",
            is_active: true,
        }
        expect(items[1].is_active).toBeFalsy();
        const output = await useCase.execute(input);
        expect(output.name).toBe(input.name);
        expect(output.description).toBe(input.description);
        expect(output.id).toBe(input.id);
        expect(output.is_active).toBeTruthy();
    });

    it("should update name, description and deactivate", async () => {
        const input = {
            id: items[0].id,
            name: "Category 1 Updated",
            description: "Description 1 Updated",
            is_active: false,
        }
        expect(items[0].is_active).toBeTruthy();
        const output = await useCase.execute(input);
        expect(output.name).toBe(input.name);
        expect(output.description).toBe(input.description);
        expect(output.id).toBe(input.id);
        expect(output.is_active).toBeFalsy();
    });
});