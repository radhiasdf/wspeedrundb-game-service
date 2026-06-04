import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AdminGuard } from './guards/admin.guard';

@Controller()
export class GameController {
  constructor(private prisma: PrismaService) {}

  @Get('games')
  async getAllGames() {
    return this.prisma.game.findMany();
  }

  @Get('games/:id')
  async getGameDetails(@Param('id') id: string) {
    return this.prisma.game.findUnique({
      where: { game_id: id },
      include: { categories: true }
    });
  }

  @Post('admin/games')
  @UseGuards(AdminGuard)
  async createGame(@Body() body: { name: string; description: string }) {
    if (!body.name || !body.description) throw new Error('Game name and description must be filled.');
    await this.prisma.game.create({
      data: { game_name: body.name, description: body.description }
    });
    return { message: 'Game record successfully created.' };
  }

  @Patch('admin/games/:id/update')
  @UseGuards(AdminGuard)
  async updateGame(@Param('id') id: string, @Body() body: any) {
    await this.prisma.game.update({
      where: { game_id: id },
      data: body
    });
    return { message: 'Game details successfully updated.' };
  }

  @Delete('admin/games/:id/delete')
  @UseGuards(AdminGuard)
  async deleteGame(@Param('id') id: string) {
    await this.prisma.game.delete({ where: { game_id: id } });
    return { message: 'Game record successfully removed.' };
  }

  // --- Run Category Context Endpoints ---

  @Get('categories/:id')
  async getCategory(@Param('id') id: string) {
    return this.prisma.runCategory.findUnique({ where: { run_category_id: id } });
  }

  @Post('admin/categories')
  @UseGuards(AdminGuard)
  async createCategory(@Body() body: { game_id: string; run_category_name: string }) {
    if (!body.run_category_name) throw new Error('Run category name must be filled.');
    
    const gameExists = await this.prisma.game.findUnique({ where: { game_id: body.game_id } });
    if (!gameExists) throw new Error('Target Game ID must exist.');

    await this.prisma.runCategory.create({
      data: { game_id: body.game_id, run_category_name: body.run_category_name }
    });
    return { message: 'Category added.' };
  }
}