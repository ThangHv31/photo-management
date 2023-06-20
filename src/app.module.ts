import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './modules/albums/album.entity';
import { AlbumModule } from './modules/albums/album.module';
import { AuthModule } from './modules/auth/auth.module';
import { PhotoReactions } from './modules/photo-reactions/photo-reactions.entity';
import { PhotoReactionsModule } from './modules/photo-reactions/photo-reactions.module';
import { Photo } from './modules/photos/photo.entity';
import { PhotoModule } from './modules/photos/photo.module';
import { User } from './modules/users/user.entity';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'myphoto',
      username: 'postgres',
      password: '110620',
      entities: [User, Photo, Album, PhotoReactions],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    AlbumModule,
    PhotoModule,
    PhotoReactionsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
