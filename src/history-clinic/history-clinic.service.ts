import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateHistoryClinicDto } from './dto/create-history-clinic.dto';
import { UpdateHistoryClinicDto } from './dto/update-history-clinic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryClinic } from './entities/history-clinic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryClinicService {
  constructor(
    @InjectRepository(HistoryClinic)
    private readonly historyClinicRepository: Repository<HistoryClinic>,
  ) {}

  async create(createHistoryClinicDto: CreateHistoryClinicDto) {
    const newHistoryClinic = this.historyClinicRepository.create(
      createHistoryClinicDto,
    );
    return await this.historyClinicRepository.save(newHistoryClinic);
  }

  async findAll() {
    return await this.historyClinicRepository.find({
      relations: {
        patient: true,
        entry: true,
      },
    });
  }

  async findOne(id: number) {
    const historyClinic = await this.historyClinicRepository.findOne({
      where: {
        id,
      },
      relations: ['patient', 'entry'],
    });

    if (!historyClinic) {
      throw new HttpException(
        `HistoryClinic with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return historyClinic;
  }

  async update(id: number, updateHistoryClinicDto: UpdateHistoryClinicDto) {
    const historyClinic = await this.historyClinicRepository.findOne({
      where: {
        id,
      },
    });

    if (!historyClinic) {
      throw new HttpException(
        `HistoryClinic with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedHistoryClinic = Object.assign(
      historyClinic,
      updateHistoryClinicDto,
    );
    return await this.historyClinicRepository.save(updatedHistoryClinic);
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
