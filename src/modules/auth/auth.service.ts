import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserService } from '../users/user.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailerService,
  ) {}
  async signIn(email: string, password: string) {
    const user = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('User not exist');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      // not match password
      throw new HttpException('Incorrect Password ', HttpStatus.BAD_REQUEST);
    }

    const access_token = await this.jwtService.signAsync({
      userId: user.id,
      email: user.email,
    });

    delete user.password;
    return {
      ...user,
      access_token,
    };
  }

  async signUp(email: string, password: string) {
    const user = await this.userService.find(email);

    if (user != null) {
      throw new BadRequestException('email already used');
    }

    const hash = await bcrypt.hash(password, 10);
    const savedUser = await this.userService.createUser(new CreateUserDto(email, hash));
    delete savedUser.password;
    return savedUser;
  }

  async sendMailReset(forgotPassDto: ForgotPasswordDto) {
    const user = await this.userService.find(forgotPassDto.email);
    const token = await this.jwtService.signAsync({
      id: user.id,
      email: forgotPassDto.email,
    });
    const link = `http://localhost:3000/auth/change-password?token=${token}`;
    await this.mailService.sendMail({
      from: 'hoangthangmucf@gmail.com',
      to: user.email,
      subject: 'Forgot Password',
      html: `
    <h3>Hello ${user.username}!</h3>
    <p>Click <a href="${link}">here</a> to reset your password.</p>
    `,
    });
  }

  async changePassword(userId, changePassDto: ChangePasswordDto) {
    const user = await this.userService.findOne(userId);

    const hashPassword = await bcrypt.hash(changePassDto.password, 10);
    user.password = hashPassword;
    this.userService.saveUser(user);
    return true;
  }
}
