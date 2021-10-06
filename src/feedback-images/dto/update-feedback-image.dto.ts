import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedbackImageDto } from './create-feedback-image.dto';

export class UpdateFeedbackImageDto extends PartialType(CreateFeedbackImageDto) {}
