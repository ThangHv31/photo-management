import {
  BadRequestException,
  Injectable,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(email: String, password: String) {
    const user = await this.userService.find(email);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(email: string, password: string) {
    const user = await this.userService.find(email);

    if (user != null) {
      throw new BadRequestException('email already used');
    }
    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');
    const savedUser = await this.userService.createUser(new CreateUserDto(email, result));
    return savedUser;
  }
}
