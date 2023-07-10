import { Test, TestingModule } from '@nestjs/testing';
import { PreordersService } from './preorders.service';

describe('PreordersService', () => {
  let service: PreordersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreordersService],
    }).compile();

    service = module.get<PreordersService>(PreordersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
