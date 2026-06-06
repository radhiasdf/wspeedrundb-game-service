import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findOne(id: string): Promise<{
        game_id: string;
        run_category_id: string;
        run_category_name: string;
    }>;
    create(dto: CreateCategoryDto): Promise<{
        game_id: string;
        run_category_id: string;
        run_category_name: string;
    }>;
    update(id: string, dto: UpdateCategoryDto): Promise<{
        game_id: string;
        run_category_id: string;
        run_category_name: string;
    }>;
    remove(id: string): Promise<{
        game_id: string;
        run_category_id: string;
        run_category_name: string;
    }>;
}
