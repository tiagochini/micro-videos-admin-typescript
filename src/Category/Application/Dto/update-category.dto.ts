export type UpdateCategoryInputDto = {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
}

export type UpdateCategoryOutputDto = {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date;
}