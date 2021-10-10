import { Injectable } from '@nestjs/common';
import { CreateFeedbackImageDto } from './dto/create-feedback-image.dto';
import { UpdateFeedbackImageDto } from './dto/update-feedback-image.dto';

@Injectable()
export class FeedbackImagesService {
  create(createFeedbackImageDto: CreateFeedbackImageDto) {
    return 'This action adds a new feedbackImage';
  }

  findAll() {
    return `This action returns all feedbackImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feedbackImage`;
  }

  update(id: number, updateFeedbackImageDto: UpdateFeedbackImageDto) {
    return `This action updates a #${id} feedbackImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedbackImage`;
  }
}
