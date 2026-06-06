import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GamesModule } from './games/games.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [PrismaModule, GamesModule, CategoriesModule],
})
export class AppModule {}
