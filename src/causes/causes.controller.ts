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
  Put,
  UploadedFiles,
} from '@nestjs/common';

import { CausesService } from './causes.service';
import { CreateCauseDto } from './dto/create-cause.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Pagination } from 'src/pagination';
import { Cause } from './entities/cause.entity';
import { UpdateCauseDto } from './dto/update-cause.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { causeStorage } from 'src/configs/storage';

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

  @Put(':id')
  @Roles('organization')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  update(@Body() updateCauseDto: UpdateCauseDto, @Param() params) {
    return this.causesService.update(params.id, updateCauseDto);
  }

  @Get('self')
  @Roles('organization')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findByOrganizationId(
    @Request() req,
    @Query() query,
  ): Promise<Pagination<Cause>> {
    console.log('teste');

    const { organizationId } = req.user;
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const situation = query.situation ?? 'all';
    const type = query.type ?? 'all';
    return this.causesService.findByOrganization(organizationId, {
      page,
      limit,
      situation,
      type,
    });
  }

  @Get(':id')
  @Roles('organization')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  show(@Param() params) {
    return this.causesService.show(params.id);
  }

  @Put(':causeId/add/feedback')
  @Roles('organization')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: causeStorage.storage,
    }),
    ClassSerializerInterceptor,
  )
  async addFeedback(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() updateCauseDto: UpdateCauseDto,
    @Param('causeId') causeId: string,
  ) {
    const filesName = files.map((element) => ({
      name: element.filename,
      cause: causeId,
    }));

    return await this.causesService.addFeedback(
      causeId,
      filesName,
      updateCauseDto.feedback,
    );
  }

  @Get()
  @Roles('organization')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.causesService.findAll();
  }
}
