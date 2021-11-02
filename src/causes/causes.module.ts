import { Module } from '@nestjs/common';
import { CausesService } from './causes.service';
import { CausesController } from './causes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cause } from './entities/cause.entity';
import { FeedbackImage } from 'src/feedback-images/entities/feedback-image.entity';
import { CauseComment } from 'src/cause-comments/entities/cause-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cause, FeedbackImage, CauseComment])],
  controllers: [CausesController],
  providers: [CausesService],
  exports: [CausesService],
})
export class CausesModule {}
