import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Cause } from './entities/cause.entity';
import { CreateCauseDto } from './dto/create-cause.dto';
import { Organization } from 'src/organizations/entities/organization.entity';
import { PaginationOptions } from 'src/pagination/pagination.options.interface';
import { Pagination } from 'src/pagination';

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

  async findByOrganization(organizationId: number, options: PaginationOptions) {
    const { limit, page } = options;

    const [results, total] = await this.causeRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      where: { organization: organizationId },
    });

    return new Pagination<Cause>({
      results,
      total,
      current_page: page,
    });
  }
}
