import { Injectable, NotFoundException } from '@nestjs/common';
import * as Unrar from 'unrar';
import { join, dirname, extname, basename } from 'path';
import { mkdir, createWriteStream, readdir } from 'fs';
import { promisify } from 'util';
import { CreateComic } from './model/create-comic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comic } from './model/comic.entity';
import { Repository } from 'typeorm';

const mkdirPromise = promisify(mkdir);
const readdirPromise = promisify(readdir);

@Injectable()
export class ComicsService {

  constructor(
    @InjectRepository(Comic)
    private comicRepository: Repository<Comic>,
  ) {
  }

  async createComic(comicDto: CreateComic) {
    const result = await this.unrarComic(comicDto.name, comicDto.path);
    const comic = new Comic();
    comic.name = comicDto.name;
    comic.thumbnailUrl = result.thumbnail;

    return comic.save();
  }

  async getComics(): Promise<Comic[]> {
    return this.comicRepository.find();
  }

  async getComicById(id: number) {
    const comic = this.comicRepository.findOne(id);
    if (!comic) {
      throw new NotFoundException(`Comic ${id} not found`);
    }

    return comic;
  }

  async listPages(id: number): Promise<string[]> {
    const comic = await this.getComicById(id);
    const path = join(__dirname, '../../public/upload/comics', comic.name);
    const urlPrefix = path.substr(path.indexOf('/upload'));
    console.log('listing', path);
    return readdirPromise(path)
      .then((files: string[]) => {
        return files
          .map((fileName: string) => join(urlPrefix, fileName));
      })
      .catch(e => {
        console.log(`Unable to list contents of ${path}`, e);
        throw e;
      });
  }

  async unrarComic(name: string, url: string): Promise<{thumbnail: string, paths: string[]}> {
    return new Promise(async (resolve, reject) => {
      const comicPath = join(__dirname, '../../public', url);
      // generate the directory path that will contain the extracted files
      // use the name of the comic itself, as it is saved on upload
      const comicDir = join(dirname(comicPath), name);
      const result = {
        thumbnail: '',
        paths: [],
      };

      console.log('comicPath', comicPath);
      console.log('comicDir', comicDir);
      const cbr = new Unrar(comicPath);

      // create the directory structure
      mkdirPromise(comicDir, {
        recursive: true,
      })
        .then(() => {
          cbr.list((err, entries) => {
            if (err) {
              console.log('Error listing cbr file', comicPath);
              return reject(err);
            }

            result.paths = entries
              .filter((entry) => entry.name.indexOf('jpg') !== -1)
              .map((entry, i) => {
                // create a stream for the data in the cbr archive
                const stream = cbr.stream(entry.name);
                stream.on('error', console.error);

                // save the extracted files, renaming them using the array index
                // i.e. /upload/comicX/[1, 2, 3 ...].jpg
                const entryPath = join(comicDir, i + extname(entry.name));
                stream.pipe(createWriteStream(entryPath, { flags: 'w' }));

                // if its the first image, use as thumbnail
                if (i === 0) {
                  const thumbnailPath = join(dirname(comicDir), 'thumbnails', basename(comicDir) + extname(entry.name));
                  console.log('thumbnailPath', thumbnailPath);
                  result.thumbnail = thumbnailPath.substr(thumbnailPath.indexOf('/upload'));
                  stream.pipe(createWriteStream(thumbnailPath), { flags: 'w' });
                }

                // return the path to the extracted comic page, usable by the browser to GET it
                return entryPath.substr(entryPath.indexOf('/upload'));
              });

            return resolve(result);
          });
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }
}
