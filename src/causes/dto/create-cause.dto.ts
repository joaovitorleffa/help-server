import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from '../entities/cause.entity';

export class CreateCauseDto {
  @IsNotEmpty({ message: 'fill_title' })
  title: string;

  @IsNotEmpty({ message: 'fill_description' })
  description: string;

  @IsOptional()
  feedback: string;

  @IsNotEmpty({ message: 'fill_type' })
  @IsEnum(Type, { message: 'invalid_type' })
  type: Type;

  @IsDateString({}, { message: 'fill_end_at' })
  endAt: string;
}
