import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findOne(run_category_id: string): Promise<{
        game_id: string;
        run_category_id: string;
        run_category_name: string;
    }>;
    create(dto: CreateCategoryDto): Promise<{
        game_id: string;
        run_category_id: string;
        run_category_name: string;
    }>;
    update(run_category_id: string, dto: UpdateCategoryDto): Promise<{
        game_id: string;
        run_category_id: string;
        run_category_name: string;
    }>;
    remove(run_category_id: string): Promise<{
        game_id: string;
        run_category_id: string;
        run_category_name: string;
    }>;
}
