import Category from "../../../Category/Domain/Entities/category";
import CategoryRepository from "../../../Category/Domain/Repository/category.repository";
import { UseCaseContract } from "../../../_Shared/Application/Use-case/use-case.contract";
import { UpdateCategoryInputDto, UpdateCategoryOutputDto } from "../Dto/update-category.dto";

export default class UpdateCategoryUseCase implements UseCaseContract<UpdateCategoryInputDto, UpdateCategoryOutputDto> {

    constructor(private categoryRepo: CategoryRepository.Repository) {
    }

    async execute(input: UpdateCategoryInputDto): Promise<UpdateCategoryOutputDto> {

        const category: Category = await this.categoryRepo.findById(input.id);

        category.update({ name: input.name, description: input.description });

        await this.categoryRepo.update(category);
        if (input.is_active === true) {
            category.activate();
        } else if (input.is_active === false) {
            category.deactivate();
        }
        return {
            id: category.id,
            name: category.name,
            description: category.description,
            is_active: category.is_active,
            created_at: category.created_at
        };
    }
}