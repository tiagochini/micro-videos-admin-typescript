import CategoryRepository from "../../../Category/Domain/Repository/category.repository";
import { UseCaseContract } from "../../../_Shared/Application/Use-case/use-case.contract";
import { DeleteCategoryInputDto, DeleteCategoryOutputDto } from "../Dto/delete-category.dto";

export default class DeleteCategoryUseCase implements UseCaseContract<DeleteCategoryInputDto, DeleteCategoryOutputDto> {

    constructor(private categoryRepo: CategoryRepository.Repository) {
    }

    async execute(input: DeleteCategoryInputDto): Promise<DeleteCategoryOutputDto> {

        const category = await this.categoryRepo.findById(input.id);

        await this.categoryRepo.delete(category.id);

        return {
            success: true
        };
    }
}