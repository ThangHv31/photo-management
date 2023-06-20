import { Body, Controller, Delete, Param, Post, Session } from '@nestjs/common';
import { ReactionDto } from './dto/reaction.dto';
import { PhotoReactionsService } from './photo-reactions.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('react')
@ApiBearerAuth()
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
