import {
    SearchableRepositoryInterface,
    SearchParams as DefaultSearchParams,
    SearchResult as DefaultSearchResult,
} from "../../../_Shared/Domain/Repository/repository-contracts";
import Category from "../Entities/category";


export namespace CategoryRepository {
    export type Filter = string;

    export class SearchParams extends DefaultSearchParams<Filter> {
    }

    export class SearchResult extends DefaultSearchResult<Category, Filter> {
    }

    export interface Repository
        extends SearchableRepositoryInterface<
        Category,
        Filter,
        SearchParams,
        SearchResult
        > {

    }
}

export default CategoryRepository;