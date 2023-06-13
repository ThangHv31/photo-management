import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album/album.entity';
import { AlbumModule } from './album/album.module';
import { AuthModule } from './auth/auth.module';
import { PhotoReactions } from './photo-reaction/photo-reactions.entity';
import { PhotoReactionsModule } from './photo-reaction/photo-reactions.module';
import { Photo } from './photos/photo.entity';
import { PhotoModule } from './photos/photo.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

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
})
export class AppModule {}
