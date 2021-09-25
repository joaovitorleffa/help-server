import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Cause } from './entities/cause.entity';
import { CreateCauseDto } from './dto/create-cause.dto';

@Injectable()
export class CausesService {
  constructor(
    @InjectRepository(Cause) private causeRepository: Repository<Cause>,
  ) {}

  async create(createCauseDto: CreateCauseDto): Promise<Cause> {
    const newCause = this.causeRepository.create(createCauseDto);
    return await this.causeRepository.save(newCause);
  }

  findAll() {
    return this.causeRepository.find();
  }
}
