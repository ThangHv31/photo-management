import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: String;
  @IsString()
  username: String;
  @IsEmail()
  email: String;
  @IsString()
  password: String;

  constructor(email: String, password: String) {
    this.email = email;
    this.password = password;
  }
}
