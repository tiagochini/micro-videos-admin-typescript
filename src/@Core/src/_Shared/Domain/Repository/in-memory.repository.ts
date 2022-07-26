import Entity from "../Entity/entity";
import NotFoundError from "#Shared/Domain/Errors/not-found.error";
import UniqueEntityId from "#Shared/Domain/ValueObjects/unique-entity-id.vo";
import { RepositoryInterface, SearchableRepositoryInterface, SearchParams, SearchResult, SortDirection } from "./repository-contracts";


export abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E>{

    items: E[] = [];

    async insert(entity: E): Promise<void> {
        this.items.push(entity);
    }

    async findById(id: string | UniqueEntityId): Promise<E> {
        const _id = `${id}`;
        return this._get(_id);
    }

    async findAll(): Promise<E[]> {
        return this.items;
    }

    async update(entity: E): Promise<void> {
        await this._get(entity.id);
        const indexFound = this.items.findIndex(i => i.id === entity.id);
        this.items[indexFound] = entity;
    }


    async delete(id: string | UniqueEntityId): Promise<void> {
        const _id = `${id}`;
        await this._get(_id);
        const indexFound = this.items.findIndex(i => i.id === id);
        this.items.splice(indexFound, 1);
    }


    protected async _get(id: string): Promise<E> {
        const _id = `${id}`;
        const item = this.items.find(i => i.id === _id);
        if (!item) {
            throw new NotFoundError(`Entity not found using id: ${id}`);
        }

        return item;
    }
}

export abstract class InMemorySearchableRepository<E extends Entity>
    extends InMemoryRepository<E>
    implements SearchableRepositoryInterface<E>
{
    sortableFields: string[] = [];
    async search(props: SearchParams): Promise<SearchResult<E>> {

        const itemsFiltered = await this.applyFilter(this.items, props.filter);

        const itemsSorted = await this.applySort(itemsFiltered, props.sort, props.sort_dir);

        const itemsPaged = await this.applyPaginate(itemsSorted, props.page, props.per_page);

        return new SearchResult({
            items: itemsPaged,
            total: itemsFiltered.length,
            current_page: props.page,
            per_page: props.per_page,
            sort: props.sort,
            sort_dir: props.sort_dir,
            filter: props.filter
        });
    }

    protected abstract applyFilter(items: E[], filter: string | null): Promise<E[]>;

    protected async applySort(items: E[], sort: string | null, sort_dir: SortDirection): Promise<E[]> {
        if (!sort || !this.sortableFields.includes(sort)) {
            return items;
        }
        const sort_dir_ = sort_dir || 'asc';
        return [...items].sort((a, b) => {
            if (a.props[sort] < b.props[sort]) {
                return sort_dir_ === 'asc' ? -1 : 1;
            }
            if (a.props[sort] > b.props[sort]) {
                return sort_dir_ === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }

    protected async applyPaginate(items: E[], page: SearchParams['page'], per_page: SearchParams['per_page']): Promise<E[]> {
        if (!page) {
            return items;
        }
        const page_ = page || 1;
        const per_page_ = per_page || 15;
        const start = (page_ - 1) * per_page_;
        const end = start + per_page_;

        return items.slice(start, end);
    }
}

