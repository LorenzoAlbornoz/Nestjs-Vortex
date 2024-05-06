import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Consultation } from './entities/consultation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectRepository(Consultation)
    private consultationRepository: Repository<Consultation>,
  ) {}

  async create(createConsultationDto: CreateConsultationDto) {
    const newConsultation = this.consultationRepository.create(
      createConsultationDto,
    );
    await this.consultationRepository.save(newConsultation);
    return newConsultation;
  }

  async findAll() {
    return await this.consultationRepository.find();
  }

  async findOne(id: number) {
    const consultation = await this.consultationRepository.findOne({
      where: {
        id,
      },
    });

    if (!consultation) {
      throw new HttpException(
        `Consultation with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return consultation;
  }

  async update(id: number, updateConsultationDto: UpdateConsultationDto) {
    const consultation = await this.consultationRepository.findOne({
      where: {
        id,
      },
    });
    if (!consultation) {
      throw new HttpException(
        `Consultation with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedConsultation = Object.assign(
      consultation,
      updateConsultationDto,
    );
    return await this.consultationRepository.save(updatedConsultation);
  }

  async remove(id: number) {
    const result = await this.consultationRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException(
        `Consultation with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }
}
