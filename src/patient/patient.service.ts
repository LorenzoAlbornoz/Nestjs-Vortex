interface EntryId {
  id: number;
}

import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { HistoryClinic } from 'src/history-clinic/entities/history-clinic.entity';
import { HistoryClinicService } from 'src/history-clinic/history-clinic.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    @InjectRepository(HistoryClinic)
    private historyClinicRepository: Repository<HistoryClinic>,
    private historyClinicService: HistoryClinicService,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const userFound = await this.patientRepository.findOne({
      where: {
        dni: createPatientDto.dni,
      },
    });

    if (userFound) {
      return new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const newPatient = this.patientRepository.create(createPatientDto);
    await this.patientRepository.save(newPatient);

    const historyClinic = new HistoryClinic();
    historyClinic.patient = newPatient;

    await this.historyClinicRepository.save(historyClinic);

    return newPatient;
  }

  async findAll() {
    return await this.patientRepository.find({
      relations: ['historyClinic', 'historyClinic.entries.doctor'],
    });
  }

  async findOnePatient(id: number): Promise<any> {
    const patientFound = await this.patientRepository.findOne({
      where: { id },
      relations: ['historyClinic'],
    });

    if (!patientFound) {
      throw new NotFoundException('User not found');
    }

    let entryIds: EntryId[] = [];
    if (patientFound.historyClinic) {
      const historyFound = await this.historyClinicService.findOne(
        patientFound.historyClinic.id,
      );
      entryIds = historyFound.entries.map((entry) => ({ id: entry.id }));
    }

    return {
      ...patientFound,
      historyClinic: {
        ...patientFound.historyClinic,
        entries: entryIds,
      },
    };
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const userFound = await this.patientRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(userFound, updatePatientDto);
    return this.patientRepository.save(updateUser);
  }

  async remove(id: number) {
    const patient = await this.patientRepository.findOne({
      where: {
        id,
      },
    });
    if (!patient) {
      throw new Error('Patient not found');
    }

    await this.patientRepository.softRemove(patient);
    return 'DELETED';
  }
}
