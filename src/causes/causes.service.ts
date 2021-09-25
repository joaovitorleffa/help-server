import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Cause } from './entities/cause.entity';
import { CreateCauseDto } from './dto/create-cause.dto';
import { Organization } from 'src/organizations/entities/organization.entity';

@Injectable()
export class CausesService {
  constructor(
    @InjectRepository(Cause) private causeRepository: Repository<Cause>,
  ) {}

  async create(
    createCauseDto: CreateCauseDto & { organization: Organization },
  ): Promise<Cause> {
    const newCause = this.causeRepository.create(createCauseDto);
    return await this.causeRepository.save(newCause);
  }

  findAll() {
    return this.causeRepository.find();
  }

  findByOrganization(organizationId: number) {
    return this.causeRepository.find({
      where: { organization: organizationId },
    });
  }
}
