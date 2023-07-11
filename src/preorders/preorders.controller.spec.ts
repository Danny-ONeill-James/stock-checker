import { Test, TestingModule } from '@nestjs/testing';
import { PreordersController } from './preorders.controller';

describe('PreordersController', () => {
  let controller: PreordersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreordersController],
    }).compile();

    controller = module.get<PreordersController>(PreordersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
