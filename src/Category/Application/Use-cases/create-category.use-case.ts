import Category from "../../../Category/Domain/Entities/category";
import CategoryRepository from "../../../Category/Domain/Repository/category.repository";
import { UseCaseContract } from "../../../_Shared/Application/Use-case/use-case.contract";
import { CreateCategoryInputDto, CreateCategoryOutputDto } from "../Dto/create-category.dto";

export default class CreateCategoryUseCase implements UseCaseContract<CreateCategoryInputDto, CreateCategoryOutputDto> {

    constructor(private categoryRepo: CategoryRepository.Repository) {
    }

    async execute(input: CreateCategoryInputDto): Promise<CreateCategoryOutputDto> {

        const category: Category = new Category({
            name: input.name,
            description: input.description,
            is_active: input.is_active
        });

        await this.categoryRepo.insert(category);

        return {
            id: category.id,
            name: category.name,
            description: category.description,
            is_active: category.is_active,
            created_at: category.created_at
        };
    }
}