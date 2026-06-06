import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'uuid-game-id-here' })
  @IsString()
  @IsNotEmpty()
  game_id!: string;

  @ApiProperty({ example: 'Any%' })
  @IsString()
  @IsNotEmpty()
  run_category_name!: string;
}
