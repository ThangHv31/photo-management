import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}
  async signIn(email: string, password: string) {
    const user = await this.userService.find(email);
    //find user existed (check email)
    if (!user) {
      throw new NotFoundException('User not exist');
      // 400 User not found
    }

    // compare password
    const [salt, storeHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    console.log('22', hash.toString('hex'));
    console.log('23', storeHash);
    if (storeHash !== hash.toString('hex')) {
      // not match password
      throw new Error('Incorrect Password ');
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
    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');
    const savedUser = await this.userService.createUser(new CreateUserDto(email, result));
    return savedUser;
  }
}
