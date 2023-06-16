import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReactionDto } from 'src/photo-reaction/dto/reaction.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { PhotoReactions } from './photo-reactions.entity';

@Injectable()
export class PhotoReactionsService {
  constructor(
    @InjectRepository(PhotoReactions) private photoReactionRepo: Repository<PhotoReactions>,
    private userService: UserService,
  ) {}

  async reactPhoto(reactionDto: ReactionDto) {
    return await this.photoReactionRepo.save(reactionDto);
  }

  async countLike(photoId: number) {
    const count = await this.photoReactionRepo
      .createQueryBuilder('reaction')
      .where(' reaction.photoId = :photoId ', { photoId: photoId })
      .getCount();
    return count;
  }
  async listComment(photoId: number) {
    const count = await this.photoReactionRepo
      .createQueryBuilder('reaction')
      .leftJoin(User, 'user', 'user.id = reaction.userId')
      .select(' reaction.comment, reaction.userId, user.username ')
      .where(' reaction.photoId = :photoId ', { photoId: photoId })
      .getRawMany();
    return count;
  }

  //Delete comment
  async deleteComment(id: number, session) {
    const react = await this.photoReactionRepo.findOneBy({ id });
    const user = await this.userService.findOne(session.userId);
    if (react && (react.userId = Number(user.id))) {
      react.comment = null;
      return this.photoReactionRepo.save(react);
    } else {
      throw new Error('Can not remove this comment');
    }
  }
}
