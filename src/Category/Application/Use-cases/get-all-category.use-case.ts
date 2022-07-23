import CategoryRepository from "../../../Category/Domain/Repository/category.repository";
import { UseCaseContract } from "../../../_Shared/Application/Use-case/use-case.contract";
import { GetAllCategoryInputDto, GetAllCategoryOutputDto } from "../Dto/get-all-category.dto";

export default class GetAllCategoryUseCase implements UseCaseContract<GetAllCategoryInputDto, GetAllCategoryOutputDto> {

    constructor(private categoryRepo: CategoryRepository.Repository) {
    }

    async execute(): Promise<GetAllCategoryOutputDto> {

        const entities = await this.categoryRepo.findAll();

        return entities.map(entity => ({
            id: entity.id,
            name: entity.name,
            description: entity.description,
            is_active: entity.is_active,
            created_at: entity.created_at,
        })) as GetAllCategoryOutputDto;
    }
}