import { Test, TestingModule } from '@nestjs/testing';
import { CauseCommentsController } from './cause-comments.controller';
import { CauseCommentsService } from './cause-comments.service';

describe('CauseCommentsController', () => {
  let controller: CauseCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CauseCommentsController],
      providers: [CauseCommentsService],
    }).compile();

    controller = module.get<CauseCommentsController>(CauseCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
