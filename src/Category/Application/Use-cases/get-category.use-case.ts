import CategoryRepository from "../../../Category/Domain/Repository/category.repository";
import { UseCaseContract } from "../../../_Shared/Application/Use-case/use-case.contract";
import { GetCategoryInputDto, GetCategoryOutputDto } from "../Dto/get-category.dto";

export default class GetCategoryUseCase implements UseCaseContract<GetCategoryInputDto, GetCategoryOutputDto> {

    constructor(private categoryRepo: CategoryRepository.Repository) {
    }

    async execute(input: GetCategoryInputDto): Promise<GetCategoryOutputDto> {

        const category = await this.categoryRepo.findById(input.id);

        return {
            id: category.id,
            name: category.name,
            description: category.description,
            is_active: category.is_active,
            created_at: category.created_at
        };
    }
}