import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/user.module';
import { PhotoReactionController } from './photo-reaction.controller';
import { PhotoReactions } from './photo-reactions.entity';
import { PhotoReactionsService } from './photo-reactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoReactions]), forwardRef(() => UserModule)],
  controllers: [PhotoReactionController],
  providers: [PhotoReactionsService],
  exports: [PhotoReactionsService],
})
export class PhotoReactionsModule {}
