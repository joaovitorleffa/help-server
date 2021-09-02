import { PartialType } from '@nestjs/mapped-types';
import { CreateCauseDto } from './create-cause.dto';

export class UpdateCauseDto extends PartialType(CreateCauseDto) {}
