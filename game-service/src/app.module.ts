import { Module } from '@nestjs/common';
import { GameController } from './app.controller';
import { GameService } from './app.service';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'SUPER_SECRET_KEY_123', // change this secret key later
      signOptions: { expiresIn: '1d' }, // token lasts for 1 day
    }),
  ],
  controllers: [GameController],
  providers: [GameService, PrismaService],
})
export class AppModule {}