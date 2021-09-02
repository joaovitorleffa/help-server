import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CausesService } from './causes.service';
import { CreateCauseDto } from './dto/create-cause.dto';
import { UpdateCauseDto } from './dto/update-cause.dto';

@Controller('causes')
export class CausesController {
  constructor(private readonly causesService: CausesService) {}

  @Post()
  create(@Body() createCauseDto: CreateCauseDto) {
    return this.causesService.create(createCauseDto);
  }

  @Get()
  findAll() {
    return this.causesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.causesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCauseDto: UpdateCauseDto) {
    return this.causesService.update(+id, updateCauseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.causesService.remove(+id);
  }
}
