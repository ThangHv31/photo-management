import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoReactions } from './photo-reactions.entity';
import { PhotoReactionsService } from './photo-reactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoReactions])],
  providers: [PhotoReactionsService],
  exports: [PhotoReactionsService],
})
export class PhotoReactionsModule {}
