import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const userFound = await this.patientRepository.findOne({
      where: {
        username: createPatientDto.username,
      },
    });

    if (userFound) {
      return new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const newpacients = this.patientRepository.create(createPatientDto);

    await this.patientRepository.save(newpacients);

    return newpacients;
  }

  async findAll() {
    return await this.patientRepository.find({
      relations: {
        historyClinic: true,
        doctors: true,
      }
    });
  }

  async findOne(id: number) {
    const userFound = await this.patientRepository.findOne({
      where: {
        id,
      },
      relations: ['historyClinic'],
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
    const result = await this.patientRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
