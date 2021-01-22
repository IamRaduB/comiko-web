import { Module } from '@nestjs/common';
import { ComicsController } from './comics.controller';
import { ComicsService } from './comics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comic } from './model/comic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comic]),
  ],
  controllers: [ComicsController],
  providers: [ComicsService]
})
export class ComicsModule {}
