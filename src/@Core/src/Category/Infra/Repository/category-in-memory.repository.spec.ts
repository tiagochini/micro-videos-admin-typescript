import Category from "#Category/Domain/Entities/category";
import CategoryInMemoryRepository from "./category-in-memory.repository";


describe('CategoryInMemoryRepository', () => {

    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository();
    });

    it('should not filter items when object is null', async () => {

        const items = [new Category({ name: "test" })];
        const spyFilter = jest.spyOn(items, "filter" as any);

        let itensFiltered = await repository["applyFilter"](items, null);
        expect(itensFiltered).toStrictEqual(items);
        expect(spyFilter).not.toHaveBeenCalled();
    });

    it("should filter items using parameter", async () => {
        const items = [
            new Category({ name: "test" }),
            new Category({ name: "Test2" }),
            new Category({ name: "TesT3" }),
            new Category({ name: "fake" }),
        ];
        const spyFilter = jest.spyOn(items, "filter" as any);

        let itensFiltered = await repository["applyFilter"](items, "TEST");
        expect(itensFiltered).toStrictEqual([items[0], items[1], items[2]]);
        expect(spyFilter).toHaveBeenCalledTimes(1);
    });

    it("should sort by created_at when sort is null", async () => {
        const created_at = new Date();
        const items = [
            new Category({ name: "test", created_at }),
            new Category({ name: "test", created_at: new Date(created_at.getTime() + 500) }),
            new Category({ name: "Test2", created_at: new Date(created_at.getTime() + 100) }),
            new Category({ name: "TesT3", created_at: new Date(created_at.getTime() + 200) }),
            new Category({ name: "fake", created_at: new Date(created_at.getTime() + 300) }),
        ];

        let itensSorted = await repository["applySort"](items, null, null);
        expect(itensSorted).toStrictEqual([items[1], items[4], items[3], items[2], items[0]]);

    });

    it("should set by name", async () => {
        const items = [
            new Category({ name: "aaaa" }),
            new Category({ name: "bbbb" }),
            new Category({ name: "cccc" }),
            new Category({ name: "dddd" }),
            new Category({ name: "eeee" }),
        ];

        let itensSorted = await repository["applySort"](items, "name", "asc");
        expect(itensSorted).toStrictEqual([items[0], items[1], items[2], items[3], items[4]]);

        itensSorted = await repository["applySort"](items, "name", "desc");
        expect(itensSorted).toStrictEqual([items[4], items[3], items[2], items[1], items[0]]);
    });

    it("should paginate is null", async () => {
        const items = [
            new Category({ name: "aaaa" }),
            new Category({ name: "bbbb" }),
            new Category({ name: "cccc" }),
            new Category({ name: "dddd" }),
            new Category({ name: "eeee" }),
        ];

        let itensPaginated = await repository["applyPaginate"](items, null, null);
        expect(itensPaginated).toStrictEqual(items);
    });

    it("should paginate when parameters ", async () => {
        const items = [
            new Category({ name: "aaaa" }),
            new Category({ name: "bbbb" }),
            new Category({ name: "cccc" }),
            new Category({ name: "dddd" }),
            new Category({ name: "eeee" }),
        ];

        let itensPaginated = await repository["applyPaginate"](items, 1, 2);
        expect(itensPaginated).toStrictEqual([items[0], items[1]]);
    });
});