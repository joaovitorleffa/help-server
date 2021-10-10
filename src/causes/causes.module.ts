import { Module } from '@nestjs/common';
import { CausesService } from './causes.service';
import { CausesController } from './causes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cause } from './entities/cause.entity';
import { FeedbackImage } from 'src/feedback-images/entities/feedback-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cause, FeedbackImage])],
  controllers: [CausesController],
  providers: [CausesService],
})
export class CausesModule {}
