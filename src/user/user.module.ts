import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/album/album.module';
import { PhotoModule } from 'src/photos/photo.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { PhotoReactionsModule } from 'src/photo-reaction/photo-reactions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => PhotoModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => PhotoReactionsModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
