import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(run_category_id: string) {
    const category = await this.prisma.run_categories.findUnique({
      where: { run_category_id },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with id ${run_category_id} not found`,
      );
    }

    return category;
  }

  async create(dto: CreateCategoryDto) {
    // Validasi game_id harus exist
    const game = await this.prisma.games.findUnique({
      where: { game_id: dto.game_id },
    });

    if (!game) {
      throw new BadRequestException(
        `Game with id ${dto.game_id} does not exist`,
      );
    }

    return this.prisma.run_categories.create({
      data: {
        game_id: dto.game_id,
        run_category_name: dto.run_category_name,
      },
    });
  }

  async update(run_category_id: string, dto: UpdateCategoryDto) {
    await this.findOne(run_category_id);

    return this.prisma.run_categories.update({
      where: { run_category_id },
      data: dto,
    });
  }

  async remove(run_category_id: string) {
    await this.findOne(run_category_id);

    return this.prisma.run_categories.delete({ where: { run_category_id } });
  }
}
