import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'Any%' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  run_category_name?: string;
}
