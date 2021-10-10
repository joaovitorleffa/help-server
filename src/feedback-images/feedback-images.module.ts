import { Module } from '@nestjs/common';
import { FeedbackImagesService } from './feedback-images.service';
import { FeedbackImagesController } from './feedback-images.controller';
import { FeedbackImage } from './entities/feedback-image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackImage])],
  controllers: [FeedbackImagesController],
  providers: [FeedbackImagesService],
})
export class FeedbackImagesModule {}
