import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ComicsService } from './comics.service';
import { CreateComic } from './model/create-comic.dto';

@Controller('api/comics')
export class ComicsController {
  constructor(private comicsService: ComicsService) {
  }

  @Post()
  async createComic(@Body() comicDto: CreateComic) {
    return this.comicsService.createComic(comicDto);
  }

  @Get()
  getComics() {
    return this.comicsService.getComics();
  }

  @Get(':id/pages')
  listPages(@Param('id', ParseIntPipe) id: number) {
    return this.comicsService.listPages(id);
  }
}
