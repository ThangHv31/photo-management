import { Body, Controller, Param, Post, Put, Session } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  async createAlbum(@Body() albumDto: AlbumDto, @Session() session: any) {
    return await this.albumService.createNewAlbum(albumDto);
  }
  @Put('/:id')
  async updateAlbum(@Param('id') id, @Body() albumDto: AlbumDto) {
    return await this.albumService.updateAlbum(id, albumDto);
  }
}
