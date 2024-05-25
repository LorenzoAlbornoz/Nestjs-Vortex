import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from './entities/entry.entity';
import { HistoryClinic } from 'src/history-clinic/entities/history-clinic.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
    @InjectRepository(HistoryClinic)
    private historyClinicRepository: Repository<HistoryClinic>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async create(historyClinicId: number, doctorId: number) {
    // Verificar si existe la historia clínica
    const historyClinic = await this.historyClinicRepository.findOne({
      where: {
        id: historyClinicId,
      },
    });
    if (!historyClinic) {
      throw new NotFoundException(
        `HistoryClinic with ID ${historyClinicId} not found`,
      );
    }

    const doctor = await this.doctorRepository.findOne({
      where: {
        id: doctorId,
      },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }

    // Crear una nueva entrada asociada con la historia clínica
    const newEntry = new Entry();
    newEntry.historyClinic = historyClinic;
    newEntry.doctor = doctor;
    newEntry.data = [];

    return await this.entryRepository.save(newEntry);
  }

  async findAll() {
    return await this.entryRepository.find({
      relations: ['historyClinic', 'consultations', 'practices', 'doctor'],
    });
  }

  async findOne(id: number) {
    const entry = await this.entryRepository.findOne({
      where: {
        id,
      },
      relations: ['historyClinic', 'consultations', 'practices', 'doctor'],
    });
    if (!entry) {
      throw new NotFoundException(`Entry with ID ${id} not found`);
    }
    return entry;
  }

  async remove(id: number) {
    const entry = await this.findOne(id); // Verificar si la entrada existe antes de intentar eliminarla
    return await this.entryRepository.remove(entry);
  }
}
