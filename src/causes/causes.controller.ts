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
} from '@nestjs/common';

import { CausesService } from './causes.service';
import { CreateCauseDto } from './dto/create-cause.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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

  @Get(':id')
  @Roles('organization')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findByOrganizationId(@Param() params) {
    return this.causesService.findByOrganization(params.id);
  }

  @Get()
  @Roles('organization')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.causesService.findAll();
  }
}
