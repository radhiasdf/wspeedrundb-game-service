import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
export declare class GamesController {
    private readonly gamesService;
    constructor(gamesService: GamesService);
    findAll(): Promise<{
        game_id: string;
        game_name: string;
        description: string;
    }[]>;
    findOne(id: string): Promise<{
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
    update(id: string, dto: UpdateGameDto): Promise<{
        game_id: string;
        game_name: string;
        description: string;
    }>;
    remove(id: string): Promise<{
        game_id: string;
        game_name: string;
        description: string;
    }>;
}
