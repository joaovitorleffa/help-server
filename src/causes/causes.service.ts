import { Connection, LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Cause } from './entities/cause.entity';
import { CreateCauseDto } from './dto/create-cause.dto';
import { Organization } from 'src/organizations/entities/organization.entity';
import { PaginationOptions } from 'src/pagination/pagination.options.interface';
import { Pagination } from 'src/pagination';
import { UpdateCauseDto } from './dto/update-cause.dto';
import { CauseOptions } from './cause.options.interface';
import { FeedbackImage } from 'src/feedback-images/entities/feedback-image.entity';
import { UpdateFeedbackImageDto } from 'src/feedback-images/dto/update-feedback-image.dto';
import { unlink } from 'fs/promises';

type FindAll = Cause & {
  organization: Pick<Organization, 'name'>;
};

@Injectable()
export class CausesService {
  constructor(
    private connection: Connection,
    @InjectRepository(Cause) private causeRepository: Repository<Cause>,
    @InjectRepository(FeedbackImage)
    private feedbackImageRepository: Repository<FeedbackImage>,
  ) {}

  async create(createCauseDto: CreateCauseDto & { organization: Organization }): Promise<Cause> {
    const newCause = this.causeRepository.create(createCauseDto);
    return await this.causeRepository.save(newCause);
  }

  async update(id: number, updateCauseDto: UpdateCauseDto) {
    return await this.causeRepository.update({ id }, updateCauseDto);
  }

  async findById(id: number): Promise<Cause> {
    return await this.causeRepository.findOne(id);
  }

  async findAll({ page, limit }: { page: number; limit: number }): Promise<Pagination<FindAll>> {
    const [results, total] = await this.causeRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      relations: ['organization'],
      where: { endAt: MoreThanOrEqual(new Date()) },
    });

    return new Pagination<FindAll>({
      results,
      total,
      current_page: page,
    });
  }

  async show(id: string) {
    return await this.causeRepository
      .createQueryBuilder('cause')
      .leftJoinAndSelect('cause.feedbackImages', 'feedbackImages')
      .where('cause.id = :id', { id })
      .getOne();
  }

  async findByOrganization(organizationId: number, options: PaginationOptions & CauseOptions) {
    const { limit, page, situation, type } = options;

    const [results, total] = await this.causeRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        organization: organizationId,
        ...(type !== 'all' && { type }),
        ...(situation !== 'all' && {
          endAt: situation === 'progress' ? MoreThanOrEqual(new Date()) : LessThan(new Date()),
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

  async addFeedback(id: string, filesName: UpdateFeedbackImageDto[], feedback: string) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newFeedbackImages = this.feedbackImageRepository.create(filesName);

      await queryRunner.manager.save(newFeedbackImages);

      await queryRunner.manager.update(Cause, id, { feedback });

      await queryRunner.commitTransaction();

      return await this.show(id);
    } catch (e) {
      console.log('[addFeedback]:', e);

      await queryRunner.rollbackTransaction();

      for (const image of filesName) {
        await unlink(`./uploads/causes/feedback/${image.name}`);
      }

      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'save_feedback_error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
