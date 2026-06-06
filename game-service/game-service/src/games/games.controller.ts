import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AdminGuard } from '../auth/admin.guard';

@ApiTags('Games')
@Controller()
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  // ===== PUBLIC =====

  @Get('games')
  @ApiOperation({ summary: 'Ambil semua game' })
  @ApiResponse({ status: 200, description: 'List semua game' })
  findAll() {
    return this.gamesService.findAll();
  }

  @Get('games/:id')
  @ApiOperation({ summary: 'Detail game beserta run categories' })
  @ApiResponse({ status: 200, description: 'Detail game' })
  @ApiResponse({ status: 404, description: 'Game tidak ditemukan' })
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  // ===== ADMIN ONLY =====

  @Post('admin/games')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[ADMIN] Tambah game baru' })
  @ApiResponse({ status: 201, description: 'Game berhasil dibuat' })
  create(@Body() dto: CreateGameDto) {
    return this.gamesService.create(dto);
  }

  @Patch('admin/games/:id/update')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[ADMIN] Update game' })
  @ApiResponse({ status: 200, description: 'Game berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Game tidak ditemukan' })
  update(@Param('id') id: string, @Body() dto: UpdateGameDto) {
    return this.gamesService.update(id, dto);
  }

  @Delete('admin/games/:id/delete')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[ADMIN] Hapus game' })
  @ApiResponse({ status: 200, description: 'Game berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Game tidak ditemukan' })
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }
}
