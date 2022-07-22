import { SearchParams, SearchResult } from "../repository-contracts";
describe("SearchResult", () => {
    describe("SearchRepository unit test", () => {

        test('page prop', () => {
            let params = new SearchParams();
            expect(params.page).toBe(1);

            const arrange = [
                { page: null as any, expected: 1 },
                { page: "" as any, expected: 1 },
                { page: 1 as any, expected: 1 },
                { page: 0 as any, expected: 1 },
                { page: 10 as any, expected: 10 },
                { page: 5 as any, expected: 5 },
                { page: -10 as any, expected: 1 },
                { page: false as any, expected: 1 },
                { page: true as any, expected: 1 },
                { page: {} as any, expected: 1 },
            ];

            arrange.forEach((i) => {
                expect(new SearchParams({ page: i.page }).page).toBe(i.expected);
            });
        });

        test('per_page prop', () => {
            let params = new SearchParams();
            expect(params.per_page).toBe(15);

            const arrange = [
                { per_page: null as any, expected: 15 },
                { per_page: "" as any, expected: 15 },
                { per_page: 1 as any, expected: 1 },
                { per_page: 0 as any, expected: 15 },
                { per_page: 10 as any, expected: 10 },
                { per_page: 5 as any, expected: 5 },
                { per_page: -10 as any, expected: 15 },
                { per_page: false as any, expected: 15 },
                { per_page: true as any, expected: 15 },
                { per_page: {} as any, expected: 15 },
            ];

            arrange.forEach((i) => {
                expect(new SearchParams({ per_page: i.per_page }).per_page).toBe(i.expected);
            });
        });

        test('sort prop', () => {
            let params = new SearchParams();
            expect(params.sort).toBe(null);

            const arrange = [
                { sort: null as any, expected: null },
                { sort: undefined as any, expected: null },
                { sort: "" as any, expected: null },
                { sort: {} as any, expected: "[object Object]" },
                { sort: 5.5 as any, expected: "5.5" },
                { sort: "sort" as any, expected: "sort" },
                { sort: "sort_dir" as any, expected: "sort_dir" },
                { sort: "sort_dir_asc" as any, expected: "sort_dir_asc" },
                { sort: "sort_dir_desc" as any, expected: "sort_dir_desc" },
                { sort: "sort_dir_asc_desc" as any, expected: "sort_dir_asc_desc" },
            ];

            arrange.forEach((i) => {
                expect(new SearchParams({ sort: i.sort }).sort).toBe(i.expected);
            });
        });

        test('sort_dir prop', () => {
            let params = new SearchParams();
            expect(params.sort_dir).toBe("asc");

            const arrange = [
                { sort_dir: null as any, expected: "asc" },
                { sort_dir: "" as any, expected: "asc" },
                { sort_dir: undefined as any, expected: "asc" },
                { sort_dir: "asc" as any, expected: "asc" },
                { sort_dir: "ASC" as any, expected: "asc" },
                { sort_dir: "desc" as any, expected: "desc" },
                { sort_dir: "asc_desc" as any, expected: "asc" },
                { sort_dir: "DESC" as any, expected: "desc" },
                { sort_dir: "desc_asc" as any, expected: "asc" },
                { sort_dir: 1 as any, expected: "asc" },
                { sort_dir: 0 as any, expected: "asc" },
                { sort_dir: 10 as any, expected: "asc" },
                { sort_dir: 5 as any, expected: "asc" },
                { sort_dir: -10 as any, expected: "asc" },
                { sort_dir: false as any, expected: "asc" },
                { sort_dir: true as any, expected: "asc" },
                { sort_dir: {} as any, expected: "asc" },
            ];

            arrange.forEach((i) => {
                expect(new SearchParams({ sort: "field", sort_dir: i.sort_dir }).sort_dir).toBe(i.expected);
            });
        });

        test('filter prop', () => {
            let params = new SearchParams();
            expect(params.filter).toBe(null);

            const arrange = [
                { filter: null as any, expected: null },
                { filter: undefined as any, expected: null },
                { filter: "" as any, expected: null },
                { filter: {} as any, expected: "[object Object]" },
                { filter: 5.5 as any, expected: "5.5" },
                { filter: "filter" as any, expected: "filter" },
                { filter: "filter_dir" as any, expected: "filter_dir" },
                { filter: "filter_dir_asc" as any, expected: "filter_dir_asc" },
                { filter: "filter_dir_desc" as any, expected: "filter_dir_desc" },
                { filter: "filter_dir_asc_desc" as any, expected: "filter_dir_asc_desc" },
            ];

            arrange.forEach((i) => {
                expect(new SearchParams({ filter: i.filter }).filter).toBe(i.expected);
            });
        });


    });

    describe('SearchResult Unit test', () => {
        test('constructor props', () => {
            let result = new SearchResult({
                items: ['item1', 'item2'] as any,
                total: 4,
                current_page: 1,
                per_page: 2,
                sort: null,
                sort_dir: null,
                filter: null,
            });

            expect(result.toJSON()).toStrictEqual({
                items: ['item1', 'item2'],
                total: 4,
                current_page: 1,
                last_page: 2,
                per_page: 2,
                sort: null,
                sort_dir: null,
                filter: null,
            });

            result = new SearchResult({
                items: ['item1', 'item2'] as any,
                total: 4,
                current_page: 1,
                per_page: 2,
                sort: "name",
                sort_dir: 'asc',
                filter: 'test',
            });

            expect(result.toJSON()).toStrictEqual({
                items: ['item1', 'item2'],
                total: 4,
                current_page: 1,
                last_page: 2,
                per_page: 2,
                sort: "name",
                sort_dir: 'asc',
                filter: 'test',
            });
        });

        it('should set last_page 1 whe per_page field is greater than total field', () => {
            let result = new SearchResult({
                items: [] as any,
                total: 4,
                current_page: 1,
                per_page: 15,
                sort: "name",
                sort_dir: 'asc',
                filter: 'test',
            });

            expect(result.last_page).toBe(1);
        });

        test('last_page prop when total is not a multiple of per_page', () => {
            let result = new SearchResult({
                items: [] as any,
                total: 101,
                current_page: 1,
                per_page: 20,
                sort: "name",
                sort_dir: 'asc',
                filter: 'test',
            });

            expect(result.last_page).toBe(6);
        });
    });
});