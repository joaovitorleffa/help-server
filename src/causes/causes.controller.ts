import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Request,
  Param,
  Query,
} from '@nestjs/common';

import { CausesService } from './causes.service';
import { CreateCauseDto } from './dto/create-cause.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Pagination } from 'src/pagination';
import { Cause } from './entities/cause.entity';

@Controller('causes')
export class CausesController {
  constructor(private readonly causesService: CausesService) {}

  @Post()
  @Roles('organization')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createCauseDto: CreateCauseDto, @Request() req) {
    const { organizationId } = req.user;
    return this.causesService.create({
      ...createCauseDto,
      organization: organizationId,
    });
  }

  @Get('self')
  @Roles('organization')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findByOrganizationId(
    @Request() req,
    @Query() query,
  ): Promise<Pagination<Cause>> {
    const { organizationId } = req.user;
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return this.causesService.findByOrganization(organizationId, {
      page,
      limit,
    });
  }

  @Get()
  @Roles('organization')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.causesService.findAll();
  }
}
