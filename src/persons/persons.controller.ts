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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { storage } from 'src/configs/storage';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }

  @Patch('edit/profile-image')
  @Roles('person')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', { storage: storage.storage }),
    ClassSerializerInterceptor,
  )
  async updateProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    await this.personsService.updateProfileImage(
      req.user.userId,
      file.filename,
    );
    return this.personsService.findByUserId(req.user.userId);
  }
}
