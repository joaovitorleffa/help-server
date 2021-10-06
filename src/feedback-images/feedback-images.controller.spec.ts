import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackImagesController } from './feedback-images.controller';
import { FeedbackImagesService } from './feedback-images.service';

describe('FeedbackImagesController', () => {
  let controller: FeedbackImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackImagesController],
      providers: [FeedbackImagesService],
    }).compile();

    controller = module.get<FeedbackImagesController>(FeedbackImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
