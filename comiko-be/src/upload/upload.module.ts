import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { extname } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: function (req, file, cb) {
          const dest = path.join('public/upload', req.params.type);
          return cb(null, dest);
        },
        filename(req, file, cb) {
          const fileName = `${req.params.type}-${(new Date()).getTime()}${extname(file.originalname).toLowerCase()}`;
          return cb(null, fileName);
        },
      }),
    }),
  ],
  controllers: [UploadController]
})
export class UploadModule {}
