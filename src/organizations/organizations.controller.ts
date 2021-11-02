import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UploadedFile,
  UseGuards,
  Request,
  Get,
  Put,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { storage } from 'src/configs/storage';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsService.create(createOrganizationDto);
  }

  @Get('/profile')
  @Roles('organization')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  show(@Request() req) {
    const { userId } = req.user;
    return this.organizationsService.findByUserId(userId);
  }

  @Patch('edit/profile-image')
  @Roles('organization')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', { storage: storage.storage }),
    ClassSerializerInterceptor,
  )
  async updateProfileImage(@UploadedFile() file: Express.Multer.File, @Request() req) {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'File not provided',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.organizationsService.updateProfileImage(req.user.userId, file.filename);
    return this.organizationsService.findByUserId(req.user.userId);
  }

  @Put('edit')
  @Roles('organization')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Body() updateOrganizationDto: UpdateOrganizationDto, @Request() req) {
    await this.organizationsService.updateOne(req.user.userId, updateOrganizationDto);
    return this.organizationsService.findByUserId(req.user.userId);
  }
}
