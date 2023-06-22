import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Public } from '../../const/constants';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  async signIn(@Body() signInDto: CreateUserDto, @Session() session: any) {
    const res = await this.authService.signIn(signInDto.email, signInDto.password);
    session.userId = res.id;
    return res;
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/signup')
  @Public()
  createUser(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto.email, userDto.password);
  }
  @Post('/forgot-password')
  @Public()
  async forgotPassword(@Body() forgotPassDto: ForgotPasswordDto) {
    return await this.authService.sendMailReset(forgotPassDto);
  }
  @Patch('/change-password')
  @UseGuards(AuthGuard)
  changPassword(@Request() req, @Body() changPasswordDto: ChangePasswordDto) {
    const user = req.user;
    return this.authService.changePassword(user.id, changPasswordDto);
  }
}
