import { Test, TestingModule } from '@nestjs/testing';
import { HistoryClinicController } from './history-clinic.controller';
import { HistoryClinicService } from './history-clinic.service';

describe('HistoryClinicController', () => {
  let controller: HistoryClinicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryClinicController],
      providers: [HistoryClinicService],
    }).compile();

    controller = module.get<HistoryClinicController>(HistoryClinicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
