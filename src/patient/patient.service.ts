import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { HistoryClinic } from 'src/history-clinic/entities/history-clinic.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    @InjectRepository(HistoryClinic)
    private historyClinicRepository: Repository<HistoryClinic>,
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
      relations: {
        historyClinic: {
          entries: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const userFound = await this.patientRepository.findOne({
      where: {
        id,
      },
      relations: ['historyClinic', 'historyClinic.entry'],
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userFound;
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
      where:{
        id,
      }
    });
    if (!patient) {
      throw new Error('Patient not found');
    }

    await this.patientRepository.softRemove(patient);
    return 'DELETED';
  }
}
