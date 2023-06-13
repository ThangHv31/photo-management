import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
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
    return this.albumRepository.findOneBy({ id });
  }

  // Create new Album
  async createNewAlbum(albumDto: AlbumDto) {
    const users = await this.userService.findByIds(albumDto.userIds);
    return this.albumRepository.save({
      name: albumDto.name,
      description: albumDto.description,
      users: users,
    });
  }
  // Update Album
  async updateAlbum(id, albumDto: AlbumDto) {
    const name = 'luc';
    const album = await this.albumRepository.findOneBy({ id });
    Object.assign(album, albumDto);
    return this.albumRepository.save(album);
  }
}
