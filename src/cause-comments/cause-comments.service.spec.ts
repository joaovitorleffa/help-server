import { Test, TestingModule } from '@nestjs/testing';
import { CauseCommentsService } from './cause-comments.service';

describe('CauseCommentsService', () => {
  let service: CauseCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CauseCommentsService],
    }).compile();

    service = module.get<CauseCommentsService>(CauseCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
