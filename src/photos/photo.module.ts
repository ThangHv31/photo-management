import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/album/album.module';
import { UserModule } from 'src/user/user.module';
import { PhotoController } from './photo.controller';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
    forwardRef(() => AlbumModule),
    forwardRef(() => UserModule),
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService],
})
export class PhotoModule {}
