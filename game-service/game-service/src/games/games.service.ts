import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.games.findMany();
  }

  async findOne(game_id: string) {
    const game = await this.prisma.games.findUnique({
      where: { game_id },
      include: { run_categories: true },
    });

    if (!game) {
      throw new NotFoundException(`Game with id ${game_id} not found`);
    }

    return game;
  }

  async create(dto: CreateGameDto) {
    return this.prisma.games.create({
      data: {
        game_name: dto.game_name,
        description: dto.description,
      },
    });
  }

  async update(game_id: string, dto: UpdateGameDto) {
    await this.findOne(game_id);

    return this.prisma.games.update({
      where: { game_id },
      data: dto,
    });
  }

  async remove(game_id: string) {
    await this.findOne(game_id);

    // Hapus run_categories dulu jika tidak ada ON DELETE CASCADE
    await this.prisma.run_categories.deleteMany({ where: { game_id } });

    return this.prisma.games.delete({ where: { game_id } });
  }
}
