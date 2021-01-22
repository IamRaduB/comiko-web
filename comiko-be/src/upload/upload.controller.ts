import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { sep } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/upload')
export class UploadController {

  @Post(':type')
  @UseInterceptors(FileInterceptor('image'))
  upload(@Param('type') type: string,
              @UploadedFile() file) {
    const fileDir = file.path.replace(`public${sep}`, '');
    const filePath = `/${fileDir.replace(/\\/g, '/')}`;
    return { url: filePath };
  }
}
