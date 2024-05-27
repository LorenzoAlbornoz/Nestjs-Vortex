import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryClinic } from './entities/history-clinic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryClinicService {
  constructor(
    @InjectRepository(HistoryClinic)
    private readonly historyClinicRepository: Repository<HistoryClinic>,
  ) {}

  async findAll() {
    return await this.historyClinicRepository.find({
      relations: {
        patient: true,
        entries: true,
      },
    });
  }

  async findOne(id: number): Promise<HistoryClinic> {
    const historyClinic = await this.historyClinicRepository.findOne({
      where: { id },
      relations: ['patient', 'entries'],
    });

    if (!historyClinic) {
      throw new NotFoundException(`HistoryClinic with ID ${id} not found`);
    }

    return historyClinic;
  }

  async findPatientHistoryById(historyClinicId: number) {
    return await this.historyClinicRepository.findOne({
      where: { id: historyClinicId },
      relations: ['patient', 'entries'],
    });
  }

  async remove(id: number) {
    const result = await this.historyClinicRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException(
        `HistoryClinic with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }
}
