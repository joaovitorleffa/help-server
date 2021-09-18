import { Injectable } from '@nestjs/common';
import { CreateCauseDto } from './dto/create-cause.dto';
import { UpdateCauseDto } from './dto/update-cause.dto';

@Injectable()
export class CausesService {
  create(createCauseDto: CreateCauseDto) {
    return 'This action adds a new cause';
  }

  findAll() {
    return `This action returns all causes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cause`;
  }

  update(id: number, updateCauseDto: UpdateCauseDto) {
    return `This action updates a #${id} cause`;
  }

  remove(id: number) {
    return `This action removes a #${id} cause`;
  }
}
