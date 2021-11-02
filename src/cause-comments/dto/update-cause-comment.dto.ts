import { PartialType } from '@nestjs/mapped-types';
import { CreateCauseCommentDto } from './create-cause-comment.dto';

export class UpdateCauseCommentDto extends PartialType(CreateCauseCommentDto) {}
