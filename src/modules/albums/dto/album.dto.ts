import { IsNotEmpty, IsString } from 'class-validator';

export class AlbumDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNotEmpty()
  userIds: number[];
}
