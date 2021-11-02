import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CauseCommentsService } from './cause-comments.service';
import { CreateCauseCommentDto } from './dto/create-cause-comment.dto';
import { CauseComment } from './entities/cause-comment.entity';

@Controller('cause-comments')
export class CauseCommentsController {
  constructor(private readonly causeCommentsService: CauseCommentsService) {}

  @Post()
  create(@Body() createCauseCommentDto: CreateCauseCommentDto): Promise<CauseComment> {
    return this.causeCommentsService.create(createCauseCommentDto);
  }

  @Get(':causeId')
  @Roles('organization', 'person')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('causeId') causeId: string, @Query() query: { limit: string }) {
    return this.causeCommentsService.findOne(+causeId, +query.limit);
  }
}
