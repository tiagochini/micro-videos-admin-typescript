import { SearchParams } from "../../../_Shared/Domain/Repository/repository-contracts";
import CategoryRepository from "../../../Category/Domain/Repository/category.repository";
import { UseCaseContract } from "../../../_Shared/Application/Use-case/use-case.contract";
import { ListCategoryInputDto, ListCategoryOutputDto } from "../Dto/list-category.dto";

export default class ListCategoryUseCase implements UseCaseContract<ListCategoryInputDto, ListCategoryOutputDto> {

    constructor(private categoryRepo: CategoryRepository.Repository) {
    }

    async execute(input: ListCategoryInputDto): Promise<ListCategoryOutputDto> {

        const inputValue = new SearchParams({
            page: input.page,
            per_page: input.per_page,
            sort: input.sort,
            sort_dir: input.sort_dir,
            filter: input.filter
        });

        const resoult = await this.categoryRepo.search(inputValue);

        return {
            total: resoult.total,
            items: resoult.items,
            current_page: resoult.current_page,
            per_page: resoult.per_page,
            sort: resoult.sort,
            sort_dir: resoult.sort_dir,
            filter: resoult.filter
        }
    }
}