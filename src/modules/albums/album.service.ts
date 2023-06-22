import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';
import { Album } from './album.entity';
import { AlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private albumRepository: Repository<Album>,
    private userService: UserService,
  ) {}

  // Get album by id
  async getById(id: number): Promise<Album> {
    return await this.albumRepository.findOneBy({ id });
  }

  // Create new Album
  async createNewAlbum(albumDto: AlbumDto) {
    const users = await this.userService.findByIds(albumDto.userIds);

    const album = await this.albumRepository.save({
      name: albumDto.name,
      description: albumDto.description,
    });

    users.forEach((user) => {
      if (user.albums != null) {
        user.albums.push(album);
      } else {
        user.albums = new Array(album);
      }
    });
    this.userService.saveAllUser(users);
    return album;
  }
  // Update Album
  async updateAlbum(id, albumDto: AlbumDto) {
    const album = await this.albumRepository.findOneBy({ id });
    Object.assign(album, albumDto);
    return await this.albumRepository.save(album);
  }
}
