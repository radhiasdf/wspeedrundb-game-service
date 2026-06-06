import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
export declare class GamesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        game_id: string;
        game_name: string;
        description: string;
    }[]>;
    findOne(game_id: string): Promise<{
        run_categories: {
            game_id: string;
            run_category_id: string;
            run_category_name: string;
        }[];
    } & {
        game_id: string;
        game_name: string;
        description: string;
    }>;
    create(dto: CreateGameDto): Promise<{
        game_id: string;
        game_name: string;
        description: string;
    }>;
    update(game_id: string, dto: UpdateGameDto): Promise<{
        game_id: string;
        game_name: string;
        description: string;
    }>;
    remove(game_id: string): Promise<{
        game_id: string;
        game_name: string;
        description: string;
    }>;
}
