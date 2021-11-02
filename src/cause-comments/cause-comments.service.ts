import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CausesService } from 'src/causes/causes.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCauseCommentDto } from './dto/create-cause-comment.dto';
import { CauseComment } from './entities/cause-comment.entity';

@Injectable()
export class CauseCommentsService {
  constructor(
    @InjectRepository(CauseComment)
    private causeCommentRepository: Repository<CauseComment>,
    private causeService: CausesService,
    private userService: UsersService,
  ) {}

  async create(createCauseCommentDto: CreateCauseCommentDto): Promise<CauseComment> {
    const { causeId, userId, comment } = createCauseCommentDto;
    const cause = await this.causeService.findById(causeId);
    const user = await this.userService.findOne(userId);

    if (!cause || !user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Body content error',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newComment = this.causeCommentRepository.create({ cause, user, comment });

    return await this.causeCommentRepository.save(newComment);
  }

  async findOne(causeId: number, limit?: number) {
    const [results, total] = await this.causeCommentRepository.findAndCount({
      take: limit,
      where: { cause: causeId },
      relations: ['user', 'user.organization', 'user.person'],
      order: { createdAt: 'DESC' },
    });

    return {
      total,
      results,
    };
  }
}
