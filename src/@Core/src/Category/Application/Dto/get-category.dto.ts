export type GetCategoryInputDto = {
    id: string;
}

export type GetCategoryOutputDto = {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date;
}