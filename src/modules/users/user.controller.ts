import { MailerService } from '@nestjs-modules/mailer';
import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationParams } from '../base/pagination-param';
import { PhotoService } from '../photos/photo.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private photoService: PhotoService,
    private mailService: MailerService,
  ) {}

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
  @Get('mail')
  async plainTextEmail(@Query('toemail') toEmail) {
    var response = await this.mailService.sendMail({
      from: 'hoangthangmucf@gmail.com',
      to: toEmail,
      subject: 'Plain Text Email',
      text: 'Welcome NestJS Email Sending Tutorial',
      html: 'Wellcome',
    });
    return response;
  }
}
