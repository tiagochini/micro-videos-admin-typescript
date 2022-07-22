import CategoryRepository from "Category/Domain/Repository/category.repository";
import { SortDirection } from "_Shared/Domain/Repository/repository-contracts";
import Category from "../../../Category/Domain/Entities/category";
import {InMemorySearchableRepository} from "../../../_Shared/Domain/Repository/in-memory.repository";

export default class CategoryInMemoryRepository
    extends InMemorySearchableRepository<Category>
    implements CategoryRepository.Repository {
    
    sortableFields: string[] = ['name', "created_at"];
    
    protected async applyFilter(items: Category[], filter: CategoryRepository.Filter): Promise<Category[]> {
        if (!filter) {
            return Promise.resolve(items);
        }

        const result = items.filter((i) => {
            return i.props.name.toLowerCase().includes(filter.toLowerCase());
        });

        return Promise.resolve(result);
    }

    protected async applySort(items:Category[], sort: string|null, sort_dir: SortDirection | null): Promise<Category[]> {
        return !sort
            ? super.applySort(items, "created_at", "desc")
            : super.applySort(items, sort, sort_dir);
    }

    
}