import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/const/constants';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  async signIn(@Body() signInDto: CreateUserDto, @Session() session: any) {
    const res = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    session.userId = res.user.id;
    return res;
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
