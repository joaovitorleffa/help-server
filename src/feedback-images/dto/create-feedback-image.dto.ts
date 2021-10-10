import { IsNotEmpty } from 'class-validator';

export class CreateFeedbackImageDto {
  @IsNotEmpty({ message: 'fill_name' })
  name: string;
}
