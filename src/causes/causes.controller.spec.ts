import { Test, TestingModule } from '@nestjs/testing';
import { CausesController } from './causes.controller';
import { CausesService } from './causes.service';

describe('CausesController', () => {
  let controller: CausesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CausesController],
      providers: [CausesService],
    }).compile();

    controller = module.get<CausesController>(CausesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
