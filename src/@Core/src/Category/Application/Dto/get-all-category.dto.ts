export type GetAllCategoryInputDto = {
}

export type GetAllCategoryOutputDto = [{
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date;
}];