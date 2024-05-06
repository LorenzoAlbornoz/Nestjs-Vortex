import { Test, TestingModule } from '@nestjs/testing';
import { HistoryClinicService } from './history-clinic.service';

describe('HistoryClinicService', () => {
  let service: HistoryClinicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryClinicService],
    }).compile();

    service = module.get<HistoryClinicService>(HistoryClinicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
