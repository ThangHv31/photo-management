import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as path from 'path';
import { AlbumService } from 'src/album/album.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
    private albumService: AlbumService,
    private userService: UserService,
  ) {}

  //Upload new Photo
  async uploadPhoto(albumId, file: Express.Multer.File, userId) {
    const name = `${file.originalname}`;
    console.log('path', path);
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
    return this.photoRepository.findOneBy({ id });
  }

  //Get user's photos
  async getUserPhoto(userId, offset, limit) {
    const data = await this.photoRepository
      .createQueryBuilder('photo')
      .where('photo.user.id = :id ', { id: userId })
      .orderBy('updated_at', 'DESC')
      .skip(offset - 1)
      .take(limit)
      .getMany();

    return data;
  }
  //Get new-feed
  async getNewFeed() {
    const data = await this.photoRepository.createQueryBuilder('photo');
  }
}
