import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReactionDto } from 'src/user/dto/reaction.dto';
import { Repository } from 'typeorm';
import { PhotoReactions } from './photo-reactions.entity';

@Injectable()
export class PhotoReactionsService {
  constructor(
    @InjectRepository(PhotoReactions) private photoReactionRepo: Repository<PhotoReactions>,
  ) {}

  async reactPhoto(reactionDto: ReactionDto) {
    let reaction: PhotoReactions;
    Object.assign(reaction, reactionDto);
    return await this.photoReactionRepo.save(reaction);
  }
}
