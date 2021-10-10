import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackImagesService } from './feedback-images.service';
import { CreateFeedbackImageDto } from './dto/create-feedback-image.dto';
import { UpdateFeedbackImageDto } from './dto/update-feedback-image.dto';

@Controller('feedback-images')
export class FeedbackImagesController {
  constructor(private readonly feedbackImagesService: FeedbackImagesService) {}

  @Post()
  create(@Body() createFeedbackImageDto: CreateFeedbackImageDto) {
    return this.feedbackImagesService.create(createFeedbackImageDto);
  }

  @Get()
  findAll() {
    return this.feedbackImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackImageDto: UpdateFeedbackImageDto) {
    return this.feedbackImagesService.update(+id, updateFeedbackImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackImagesService.remove(+id);
  }
}
