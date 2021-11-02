import { IsInt, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCauseCommentDto {
  @IsNotEmpty({ message: 'fill_comment' })
  @MaxLength(250, {
    message: 'max_comment',
  })
  comment: string;

  @IsNotEmpty({ message: 'cause_not_found' })
  @IsInt({ message: 'cause_invalid' })
  causeId: number;

  @IsNotEmpty({ message: 'user_not_found' })
  @IsInt({ message: 'user_invalid' })
  userId: number;
}
