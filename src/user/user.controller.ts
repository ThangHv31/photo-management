import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationParams } from 'src/base/pagination-param';
import { Public } from 'src/const/constants';
import { PhotoReactionsService } from 'src/photo-reaction/photo-reactions.service';
import { PhotoService } from 'src/photos/photo.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private photoService: PhotoService,
    private photoReactionsService: PhotoReactionsService,
  ) {}

  @Get()
  @Public()
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
