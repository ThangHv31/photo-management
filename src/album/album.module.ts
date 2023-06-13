import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AlbumController } from './album.controller';
import { Album } from './album.entity';
import { AlbumService } from './album.service';

@Module({
  imports: [TypeOrmModule.forFeature([Album]), forwardRef(() => UserModule)],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
