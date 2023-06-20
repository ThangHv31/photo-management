import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from '../albums/album.module';
import { PhotoReactionsModule } from '../photo-reactions/photo-reactions.module';
import { UserModule } from '../users/user.module';
import { PhotoController } from './photo.controller';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
    forwardRef(() => AlbumModule),
    forwardRef(() => UserModule),
    forwardRef(() => PhotoReactionsModule),
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService],
})
export class PhotoModule {}
