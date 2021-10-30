import {
  Controller,
  Post,
  Body,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  UploadedFile,
  Request,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PersonsService } from './persons.service';
import { personStorage } from 'src/configs/storage';
import { CreatePersonDto } from './dto/create-person.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get('profile')
  @Roles('person')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  show(@Request() req) {
    const { userId } = req.user;
    return this.personsService.findByUserId(userId);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }

  @Patch('edit/profile-image')
  @Roles('person')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor('file', { storage: personStorage.storage }),
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
    await this.personsService.updateProfileImage(req.user.userId, file.filename);
    return this.personsService.findByUserId(req.user.userId);
  }

  @Post('favorite/cause/:id')
  @Roles('person')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createFavorite(@Param('id') causeId: string, @Request() req) {
    return await this.personsService.createFavorite(+causeId, req.user.personId);
  }

  @Get('favorite')
  @Roles('person')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findFavorites(@Request() req) {
    return await this.personsService.findFavorites(req.user.personId);
  }
}
