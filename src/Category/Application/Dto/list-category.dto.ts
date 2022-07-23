import { SortDirection } from "../../../_Shared/Domain/Repository/repository-contracts";

export type ListCategoryInputDto = {
    page?: number;
    per_page?: number;
    sort?: string | null;
    sort_dir?: SortDirection | null;
    filter?: string | null;
}

export type ListCategoryOutputDto = {
    total: number;
    items: any[];
    current_page: number;
    per_page: number;
    sort: string | null;
    sort_dir: string | null;
    filter: string | null;
}