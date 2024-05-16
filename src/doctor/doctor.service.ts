import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const doctorExists = await this.doctorRepository.findOne({
      where: { numeroDeMatricula: createDoctorDto.numeroDeMatricula },
    });

    if (doctorExists) {
      throw new HttpException('Doctor already exists', HttpStatus.CONFLICT);
    }

    const newDoctor = this.doctorRepository.create(createDoctorDto);

    await this.doctorRepository.save(newDoctor);

    return newDoctor;
  }

  async findAll() {
    return await this.doctorRepository.find();
  }

  async findOne(id: number) {
    const doctor = await this.doctorRepository.findOne({
      where: {
        id,
      },
    });

    if (!doctor) {
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
    }

    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.doctorRepository.findOne({ where: { id } });

    if (!doctor) {
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
    }

    const updatedDoctor = { ...doctor, ...updateDoctorDto };
    await this.doctorRepository.save(updatedDoctor);

    return updatedDoctor;
  }

  async remove(id: number) {
    const result = await this.doctorRepository.delete(id);

    if (result.affected === 0) {
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
