import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackImagesService } from './feedback-images.service';

describe('FeedbackImagesService', () => {
  let service: FeedbackImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackImagesService],
    }).compile();

    service = module.get<FeedbackImagesService>(FeedbackImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
