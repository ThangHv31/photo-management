import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as path from 'path';
import { Repository } from 'typeorm';
import { AlbumService } from '../albums/album.service';
import { PhotoReactionsService } from '../photo-reactions/photo-reactions.service';
import { UserService } from '../users/user.service';
import { PhotoResponse } from './dto/photo-response';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
    private albumService: AlbumService,
    private userService: UserService,
    private photoReactionService: PhotoReactionsService,
  ) {}

  //Upload new Photo
  async uploadPhoto(albumId, file: Express.Multer.File, userId) {
    const name = `${file.originalname}`;
    const pathFile = path.normalize(__dirname + `./uploads/avatar/ ${file.originalname}`);
    const currentUser = await this.userService.findOne(userId);

    if (albumId != null) {
      const album = await this.albumService.getById(albumId);
      return this.photoRepository.save({
        name: name,
        user: currentUser,
        album: album,
        link: pathFile,
      });
    } else {
      return this.photoRepository.save({
        name: name,
        user: currentUser,
        album: null,
        link: pathFile,
      });
    }
  }

  // Get all Photos
  async findAll() {
    return this.photoRepository.find();
  }

  // Get photo by id
  async findById(id: number) {
    const photo = await this.photoRepository.findOneBy({ id });
    const like = await this.photoReactionService.countLike(id);
    const cmt = await this.photoReactionService.listComment(id);
    return new PhotoResponse(photo, like, cmt);
  }

  //Get user's photos
  async getUserPhoto(userId, offset, limit) {
    const data = await this.photoRepository
      .createQueryBuilder('photo')
      .where('photo.user.id = :id ', { id: userId })
      .orderBy('updated_at', 'DESC')
      .skip(Number(offset - 1))
      .take(limit)
      .getMany();

    return data;
  }
  //Get new-feed
  async getNewFeed(offset, limit) {
    const data = await this.photoRepository
      .createQueryBuilder('photo')
      .orderBy('updated_at', 'DESC')
      .skip(Number(offset - 1))
      .take(limit)
      .getMany();

    return data;
  }
}
