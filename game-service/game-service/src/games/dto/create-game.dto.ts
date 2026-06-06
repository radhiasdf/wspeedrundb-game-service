import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ example: 'Minecraft' })
  @IsString()
  @IsNotEmpty()
  game_name!: string;

  @ApiProperty({ example: 'A sandbox game by Mojang' })
  @IsString()
  @IsNotEmpty()
  description!: string;
}
