import Entity from "../../../../_Shared/Domain/Entity/entity";
import { InMemorySearchableRepository } from "../in-memory.repository";
import { SearchParams, SearchResult } from "../repository-contracts";

type StrubEntityProps = {
    name: string;
    price: number;
}

class StubEntity extends Entity<StrubEntityProps> {

}

class StubInmemorySearchRepository extends InMemorySearchableRepository<StubEntity>{

    sortableFields: string[] = ['name'];

    protected applyFilter(items: StubEntity[], filter: string | null): Promise<StubEntity[]> {
        if (!filter) {
            return Promise.resolve(items);
        }

        const result = items.filter((i) => {
            return (
                i.props.name.toLowerCase().includes(filter.toLowerCase()) || i.props.price.toString() === filter
            );
        });

        return Promise.resolve(result);
    }
}

describe('InMemorySearchableRepository', () => {
    let repository: StubInmemorySearchRepository;
    beforeEach(() => {
        repository = new StubInmemorySearchRepository();
    });

    describe("applyFilter method", () => {

        it("should no filter items when filter param is null", async () => {
            const items = [
                new StubEntity({ name: "item1", price: 1 }),
                new StubEntity({ name: "item2", price: 2 }),
                new StubEntity({ name: "item3", price: 3 }),
            ];
            const spyFilterMethod = jest.spyOn(items, "filter" as any);
            const result = await repository['applyFilter'](items, null);
            expect(result).toStrictEqual(items);
            expect(spyFilterMethod).not.toHaveBeenCalled();
        });

        it("should filter using filter a param", async () => {
            const items = [
                new StubEntity({ name: "item1", price: 1 }),
                new StubEntity({ name: "item2", price: 2 }),
                new StubEntity({ name: "item3", price: 3 }),
            ];
            const spyFilterMethod = jest.spyOn(items, "filter" as any);
            const result = await repository['applyFilter'](items, "item2");
            expect(result).toStrictEqual([items[1]]);
            expect(spyFilterMethod).toHaveBeenCalledTimes(1);

            const result2 = await repository['applyFilter'](items, "item");
            expect(result2).toStrictEqual([items[0], items[1], items[2]]);
            expect(spyFilterMethod).toHaveBeenCalledTimes(2);

            const result3 = await repository['applyFilter'](items, "3");
            expect(result3).toStrictEqual([items[2]]);
            expect(spyFilterMethod).toHaveBeenCalledTimes(3);

            const result4 = await repository['applyFilter'](items, "no-filter");
            expect(result4).toHaveLength(0);
            expect(spyFilterMethod).toHaveBeenCalledTimes(4);
        });

    });

    describe("applySort method", () => {

        it("should no sort items", async () => {
            const items = [
                new StubEntity({ name: "item1", price: 1 }),
                new StubEntity({ name: "item2", price: 2 }),
                new StubEntity({ name: "item3", price: 3 }),
            ];
            const result = await repository['applySort'](items, null, null);
            expect(result).toStrictEqual(items);

            const result1 = await repository['applySort'](items, "price", "asc");
            expect(result1).toStrictEqual(items);


            const result2 = await repository['applySort'](items, "price", "desc");
            expect(result2).toStrictEqual(items);

        });

        it("should sort items", async () => {
            const items = [
                new StubEntity({ name: "item2", price: 1 }),
                new StubEntity({ name: "item1", price: 2 }),
                new StubEntity({ name: "item3", price: 3 }),
            ];

            const result = await repository['applySort'](items, "name", "asc");
            expect(result).toStrictEqual([items[1], items[0], items[2]]);


            const result2 = await repository['applySort'](items, "name", "desc");
            expect(result2).toStrictEqual([items[2], items[0], items[1]]);
        });
    });

    describe("applyPaginate method", () => {

        it("should no paginate items", async () => {
            const items = [
                new StubEntity({ name: "item1", price: 1 }),
                new StubEntity({ name: "item2", price: 2 }),
                new StubEntity({ name: "item3", price: 3 }),
            ];
            const result = await repository['applyPaginate'](items, null, null);
            expect(result).toStrictEqual(items);
        });

        it("should paginate items", async () => {
            const items = [
                new StubEntity({ name: "item1", price: 1 }),
                new StubEntity({ name: "item2", price: 2 }),
                new StubEntity({ name: "item3", price: 3 }),
                new StubEntity({ name: "item4", price: 4 }),
                new StubEntity({ name: "item5", price: 5 }),
                new StubEntity({ name: "item6", price: 6 }),
            ];
            const result = await repository['applyPaginate'](items, 1, 2);
            expect(result).toStrictEqual([items[0], items[1]]);

            const result2 = await repository['applyPaginate'](items, 2, 2);
            expect(result2).toStrictEqual([items[2], items[3]]);

            const result3 = await repository['applyPaginate'](items, 1, 5);
            expect(result3).toStrictEqual([items[0], items[1], items[2], items[3], items[4]]);

            const result4 = await repository['applyPaginate'](items, 2, 5);
            expect(result4).toStrictEqual([items[5]]);

            const result5 = await repository['applyPaginate'](items, 3, 5);
            expect(result5).toStrictEqual([]);
        });
    });


    describe("search method", () => {
        it("should search items", async () => {
            const entity = new StubEntity({ name: "item1", price: 1 });
            const items = Array(16).fill(entity);
            repository.items = items;
            const result = await repository.search(new SearchParams());
            expect(result).toStrictEqual(new SearchResult({
                items: Array(15).fill(entity),
                total: 16,
                current_page: 1,
                per_page: 15,
                sort: null,
                sort_dir: "asc",
                filter: null,
            }));
        });

        it("should apply paginate and filter", async () => {
            const items = [
                new StubEntity({ name: "item1", price: 1 }),
                new StubEntity({ name: "a", price: 2 }),
                new StubEntity({ name: "b", price: 3 }),
                new StubEntity({ name: "c", price: 4 }),
                new StubEntity({ name: "item5", price: 5 }),
                new StubEntity({ name: "item6", price: 6 }),
            ];
            repository.items = items;
            const result = await repository.search(
                new SearchParams({
                    page: 1,
                    per_page: 2,
                    filter: "item",
                })
            );
            expect(result).toStrictEqual(new SearchResult({
                items: [items[0], items[4]],
                total: 3,
                current_page: 1,
                per_page: 2,
                sort: null,
                sort_dir: "asc",
                filter: "item",
            }));

            const result2 = await repository.search(
                new SearchParams({
                    page: 2,
                    per_page: 2,
                    filter: "item",
                }));
            expect(result2).toStrictEqual(new SearchResult({
                items: [items[5]],
                total: 3,
                current_page: 2,
                per_page: 2,
                sort: null,
                sort_dir: "asc",
                filter: "item",
            }));
        });

        it("should apply paginate and sort", async () => {
            const items = [
                new StubEntity({ name: "d", price: 1 }),
                new StubEntity({ name: "a", price: 2 }),
                new StubEntity({ name: "b", price: 3 }),
                new StubEntity({ name: "c", price: 4 }),
                new StubEntity({ name: "e", price: 5 }),
                new StubEntity({ name: "f", price: 6 }),
            ];
            repository.items = items;


            const arrange = [
                {
                    params: new SearchParams({ page: 1, per_page: 2, sort: "name", sort_dir: "desc" }),
                    result: new SearchResult({
                        items: [items[5], items[4]],
                        total: 6,
                        current_page: 1,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: "desc",
                        filter: null,
                    }),
                },
                {
                    params: new SearchParams({ page: 2, per_page: 2, sort: "name", sort_dir: "desc" }),
                    result: new SearchResult({
                        items: [items[0], items[3]],
                        total: 6,
                        current_page: 2,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: "desc",
                        filter: null,
                    }),
                }, {
                    params: new SearchParams({ page: 3, per_page: 2, sort: "name", sort_dir: "desc" }),
                    result: new SearchResult({
                        items: [items[2], items[1]],
                        total: 6,
                        current_page: 3,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: "desc",
                        filter: null,
                    }),
                },
                {
                    params: new SearchParams({ page: 1, per_page: 2, sort: "name", sort_dir: "asc" }),
                    result: new SearchResult({
                        items: [items[1], items[2]],
                        total: 6,
                        current_page: 1,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: "asc",
                        filter: null,
                    }),
                }
            ]

            for (const arrangeItem of arrange) {
                const result = await repository.search(arrangeItem.params);
                expect(result).toStrictEqual(arrangeItem.result);
            }
        });

        it("should apply paginate and filter and sort", async () => {
            const items = [
                new StubEntity({ name: "item1", price: 1 }),
                new StubEntity({ name: "a", price: 2 }),
                new StubEntity({ name: "b", price: 3 }),
                new StubEntity({ name: "ITEM2", price: 4 }),
                new StubEntity({ name: "e", price: 5 }),
                new StubEntity({ name: "IteM3", price: 6 }),
            ];
            repository.items = items;

            const arrange = [
                {
                    params: new SearchParams({ page: 1, per_page: 2, sort: "name", sort_dir: "desc", filter: "item" }),
                    result: new SearchResult({
                        items: [items[0], items[5]],
                        total: 3,
                        current_page: 1,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: "desc",
                        filter: "item",
                    }),
                },
                {
                    params: new SearchParams({ page: 2, per_page: 2, sort: "name", sort_dir: "desc", filter: "item" }),
                    result: new SearchResult({
                        items: [items[3]],
                        total: 3,
                        current_page: 2,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: "desc",
                        filter: "item",
                    }),
                }, {
                    params: new SearchParams({ page: 1, per_page: 2, sort: "name", sort_dir: "desc", filter: "b" }),
                    result: new SearchResult({
                        items: [items[2]],
                        total: 1,
                        current_page: 1,
                        per_page: 2,
                        sort: 'name',
                        sort_dir: "desc",
                        filter: "b",
                    }),
                },
            ]

            for (const arrangeItem of arrange) {
                const result = await repository.search(arrangeItem.params);
                expect(result).toStrictEqual(arrangeItem.result);
            }
        });
    });
});