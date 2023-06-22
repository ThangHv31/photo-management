import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from '../albums/album.module';
import { PhotoReactionsModule } from '../photo-reactions/photo-reactions.module';
import { PhotoModule } from '../photos/photo.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

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
