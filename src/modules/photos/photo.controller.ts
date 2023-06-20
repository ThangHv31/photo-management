import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { PhotoService } from './photo.service';
import { storageAvatarConfig } from '../../configs/file.config';

@Controller('photo')
@ApiBearerAuth()
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', { storage: storageAvatarConfig }))
  async uploadAvatar(
    @Param('id') id,
    @UploadedFile() file: Express.Multer.File,
    @Session() session: any,
  ) {
    return await this.photoService.uploadPhoto(id, file, session.userId);
  }

  @Get()
  async getAllPhotos() {
    return await this.photoService.findAll();
  }

  @Get('/:id')
  async getPhotoById(@Param('id') id) {
    return await this.photoService.findById(id);
  }

  @Get('/new-feed')
  async getNewFeed() {}
}
