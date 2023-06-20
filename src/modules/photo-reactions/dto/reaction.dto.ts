import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReactionDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  photoId: number;

  @IsBoolean()
  liked: boolean;

  @IsString()
  comment: string;
}
