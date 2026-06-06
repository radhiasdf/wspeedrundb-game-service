import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateGameDto {
  @ApiPropertyOptional({ example: 'Minecraft' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  game_name?: string;

  @ApiPropertyOptional({ example: 'A sandbox game by Mojang' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}
