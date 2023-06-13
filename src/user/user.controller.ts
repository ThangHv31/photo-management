import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationParams } from 'src/base/pagination-param';
import { Public } from 'src/const/constants';
import { PhotoService } from 'src/photos/photo.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AlbumService } from 'src/album/album.service';
import { ReactionDto } from './dto/reaction.dto';
import { PhotoReactionsService } from 'src/photo-reaction/photo-reactions.service';

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
  @Post('/signup')
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }
  @Put('/:id')
  updateUser(@Param('id') id: number, @Body() userDto: CreateUserDto) {
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

  // Like photo
  @Post()
  async likePhoto(@Body() reactionDto: ReactionDto) {
    return this.photoReactionsService.reactPhoto(reactionDto);
  }
}
