import { MailerModule } from '@nestjs-modules/mailer';
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
import { MAIL_HOST, MAIL_PASSWORD, MAIL_USER_NAME } from './const/constants';

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
    MailerModule.forRoot({
      transport: {
        host: MAIL_HOST,
        secure: false,
        auth: {
          user: MAIL_USER_NAME,
          pass: MAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
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
