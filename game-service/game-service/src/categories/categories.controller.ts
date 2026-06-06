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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AdminGuard } from '../auth/admin.guard';

@ApiTags('Categories')
@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // ===== PUBLIC =====

  @Get('categories/:id')
  @ApiOperation({ summary: 'Detail satu run category' })
  @ApiResponse({ status: 200, description: 'Detail category' })
  @ApiResponse({ status: 404, description: 'Category tidak ditemukan' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  // ===== ADMIN ONLY =====

  @Post('admin/categories')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[ADMIN] Tambah run category baru' })
  @ApiResponse({ status: 201, description: 'Category berhasil dibuat' })
  @ApiResponse({ status: 400, description: 'game_id tidak ditemukan' })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Patch('admin/categories/:id/update')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[ADMIN] Update run category' })
  @ApiResponse({ status: 200, description: 'Category berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Category tidak ditemukan' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  @Delete('admin/categories/:id/delete')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[ADMIN] Hapus run category' })
  @ApiResponse({ status: 200, description: 'Category berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Category tidak ditemukan' })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
