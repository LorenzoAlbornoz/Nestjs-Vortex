import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from './entities/entry.entity';
import { HistoryClinic } from 'src/history-clinic/entities/history-clinic.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { EntryType } from 'src/common/enums/entry-type.enum';
import { Patient } from 'src/patient/entities/patient.entity';
import { PracticeDTO } from './dto/dto-salida-entry.dto';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
    @InjectRepository(HistoryClinic)
    private historyClinicRepository: Repository<HistoryClinic>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
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

  async findAll(
    type?: EntryType | 'all' | (EntryType | 'all')[],
    from?: Date,
    to?: Date,
    doctorId?: number,
    specialty?: string,
    includeDeleted?: boolean,
    socialWork?: string,
    dni?: string[],
    diagnosis?: string,
    complication?: boolean,
  ): Promise<PracticeDTO[]> {
    const query = this.entryRepository
      .createQueryBuilder('entry')
      .innerJoinAndSelect('entry.doctor', 'doctor')
      .innerJoinAndSelect('entry.historyClinic', 'historyClinic')
      .innerJoinAndSelect('historyClinic.patient', 'patient');

    if (type && type !== 'all') {
      const typesArray = Array.isArray(type) ? type : [type];
      query.andWhere('entry.type IN (:...types)', { types: typesArray });
    }

    if (from && to) {
      query.andWhere(`entry.data->>'fecha' BETWEEN :from AND :to`, {
        from,
        to,
      });
    } else if (from) {
      query.andWhere(`entry.data->>'fecha' >= :from`, { from });
    } else if (to) {
      query.andWhere(`entry.data->>'fecha' <= :to`, { to });
    }

    if (doctorId) {
      query.andWhere('doctor.numeroDeMatricula = :doctorId', { doctorId });
    }

    if (specialty) {
      query.andWhere('doctor.specialty = :specialty', { specialty });
    }

    if (socialWork) {
      query.andWhere('patient.obraSocial = :socialWork', { socialWork });
    }

    if (dni && dni.length > 0) {
      query.andWhere('patient.dni IN (:...dni)').setParameters({ dni });
    }

    // if (includeDeleted) {
    //   query.withDeleted();
    // } else {
    //   query.andWhere('patient.deletedAt IS NOT NULL');
    // }

    if (diagnosis) {
      query.andWhere(`entry.data->'disease'->>'enfermedad' = :diagnosis`, {
        diagnosis,
      });
    }

    if (complication !== undefined) {
      if (complication) {
        // No aplicar filtro específico para las complicaciones
      } else {
        query.andWhere(`entry.data->>'complicaciones' = ''`);
      }
    }

    const resultsFromDatabase = await query.getMany();

    const practiceDTOs: PracticeDTO[] = resultsFromDatabase.map((result) => ({
      id: result.id,
      type: result.type,
      data: result.data,
      doctor: result.doctor,
      patient: result.historyClinic.patient,
    }));

    return practiceDTOs;
  }

  async findOne(id: number) {
    const entry = await this.entryRepository.findOne({
      where: {
        id,
      },
      relations: ['historyClinic', 'doctor'],
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
