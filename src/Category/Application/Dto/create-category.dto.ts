export type CreateCategoryInputDto = {
    name: string;
    description?: string;
    is_active?: boolean;
}

export type CreateCategoryOutputDto = {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date;
}
