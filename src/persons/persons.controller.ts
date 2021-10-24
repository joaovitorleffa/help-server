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

import { personStorage, storage } from 'src/configs/storage';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get('profile')
  @Roles('person')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', { storage: personStorage.storage }),
    ClassSerializerInterceptor,
  )
  async updateProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'File not provided',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.personsService.updateProfileImage(
      req.user.userId,
      file.filename,
    );
    return this.personsService.findByUserId(req.user.userId);
  }
}
