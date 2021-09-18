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
} from '@nestjs/common';
import path = require('path');
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

const storage = {
  storage: diskStorage({
    destination: './uploads/organization/images',
    filename: (req, file, cb) => {
      const date = new Date();
      const fileName =
        path.parse(file.originalname).name.replace(/\s/g, '') +
        '-' +
        date.toISOString();
      const extension = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
};

@Controller('organizations')
@UseGuards(RolesGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsService.create(createOrganizationDto);
  }

  @Patch('edit/profile-image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', storage))
  async updateProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const { user } = req;
    const { id } = await this.organizationsService.findByUserId(user.userId);
    return this.organizationsService.updateProfileImage(id, file.filename);
  }

  @Put('edit')
  @Roles('ong')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() updateOrganizationDto: UpdateOrganizationDto,
    @Request() req,
  ) {
    const { user } = req;
    console.log(user);
    const { id } = await this.organizationsService.findByUserId(user.userId);
    return this.organizationsService.updateOne(id, updateOrganizationDto);
  }
}
