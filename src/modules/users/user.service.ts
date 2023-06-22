import { Injectable, Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async getUser() {
    return this.userRepository.find();
  }

  async createUser(userDto: CreateUserDto) {
    const user = this.userRepository.create({
      email: userDto.email,
      password: userDto.password,
    });
    return this.userRepository.save(user);
  }

  async updateUser(id: number, userDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (user == null) {
      throw new Error('User not exist!');
    }
    Object.assign(user, userDto);
    return this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.findOne(id);
    if (user == null) {
      throw new Error('User not exist!');
    }
    return this.userRepository.delete(id);
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  async findByIds(ids: number[]) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.id in (:ids) ', { ids: ids })
      .getMany();
  }

  async find(email: String) {
    const user = await this.userRepository.findOneBy({ email: email as any });
    return user;
  }
  // Get by user
  async getUserPhoto(userId, offset: number, limit) {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.albums', 'album')
      .where('user.id = :id ', { id: userId })
      .orderBy('album.id', 'DESC')
      .skip(Number(offset - 1))
      .take(limit)
      .getMany();
    return data;
  }
  async getCurrentUser(@Session() session: any) {
    return await this.findOne(session.userId);
  }
  async saveUser(user: User) {
    return this.userRepository.save(user);
  }
}
