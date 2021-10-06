import { LessThan, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Cause } from './entities/cause.entity';
import { CreateCauseDto } from './dto/create-cause.dto';
import { Organization } from 'src/organizations/entities/organization.entity';
import { PaginationOptions } from 'src/pagination/pagination.options.interface';
import { Pagination } from 'src/pagination';
import { UpdateCauseDto } from './dto/update-cause.dto';
import { CauseOptions } from './cause.options.interface';

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

  async update(id: number, updateCauseDto: UpdateCauseDto) {
    return await this.causeRepository.update({ id }, updateCauseDto);
  }

  async findAll() {
    return await this.causeRepository.find();
  }

  async findByOrganization(
    organizationId: number,
    options: PaginationOptions & CauseOptions,
  ) {
    const { limit, page, situation, type } = options;

    const [results, total] = await this.causeRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        organization: organizationId,
        ...(type !== 'all' && { type }),
        ...(situation !== 'all' && {
          endAt:
            situation === 'progress'
              ? MoreThanOrEqual(new Date())
              : LessThan(new Date()),
        }),
      },
      order: { endAt: 'DESC' },
    });

    return new Pagination<Cause>({
      results,
      total,
      current_page: page,
    });
  }
}
