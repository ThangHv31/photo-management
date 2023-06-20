import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '../../const/constants';
import { PaginationParams } from '../base/pagination-param';
import { PhotoService } from '../photos/photo.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService, private photoService: PhotoService) {}

  @Get()
  async getUser() {
    return this.userService.getUser();
  }
  @Put('/:id')
  updateUser(@Param('id') id: number, @Body() userDto: UpdateUserDto) {
    return this.userService.updateUser(id, userDto);
  }

  @Get('/search')
  searchUser(@Query('email') email: String) {
    return this.userService.find(email);
  }
  @Get('/:id/photos')
  async getPhotoByUser(@Param('id') id: number, @Query() { offset, limit }: PaginationParams) {
    return await this.photoService.getUserPhoto(id, offset, limit);
  }
  @Get('/:id/albums')
  async getAlbumByUser(@Param('id') id: number, @Query() { offset, limit }: PaginationParams) {
    return await this.userService.getUserPhoto(id, offset, limit);
  }
}
