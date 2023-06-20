import { IsNotEmpty } from 'class-validator';
import { Photo } from '../photo.entity';

export class PhotoResponse {
  @IsNotEmpty()
  photo: Photo;
  like: number;
  comments;
  constructor(photo: Photo, like: number, comments) {
    this.photo = photo;
    this.like = like;
    this.comments = comments;
  }
}
