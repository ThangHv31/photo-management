import { Controller, Post, Body, Put, Delete, Param, Session } from '@nestjs/common';
import { ReactionDto } from 'src/photo-reaction/dto/reaction.dto';
import { PhotoReactionsService } from './photo-reactions.service';

@Controller('react')
export class PhotoReactionController {
  constructor(private photoReactionsService: PhotoReactionsService) {}

  @Post('/act')
  likePhoto(@Body() body: ReactionDto) {
    return this.photoReactionsService.reactPhoto(body);
  }

  @Delete('/:id')
  deleteComment(@Param('id') id, @Session() session: any) {
    return this.photoReactionsService.deleteComment(id, session);
  }
}
