import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';
import { Disease } from './entities/disease.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

@Injectable()
export class DiseaseService {
  constructor(
    @InjectRepository(Disease)
    private diseaseRepository: Repository<Disease>,
  ) {}

  async create(createDiseaseDto: CreateDiseaseDto) {
    const newDisease = this.diseaseRepository.create(createDiseaseDto);
    return await this.diseaseRepository.save(newDisease);
  }

  async findAll() {
    return await this.diseaseRepository.find({
      relations: {
        consultation: true,
      },
    });
  }

  async findOne(id: number) {
    const disease = await this.diseaseRepository.findOne({
      where: {
        id,
      },
      relations: ['consultation'],
    });
    if (!disease) {
      throw new NotFoundException(`Disease with ID ${id} not found`);
    }
    return disease;
  }

  async update(id: number, updateDiseaseDto: UpdateDiseaseDto) {
    const disease = await this.diseaseRepository.findOne({
      where: {
        id,
      },
    });
    if (!disease) {
      throw new NotFoundException(`Disease with ID ${id} not found`);
    }
    Object.assign(disease, updateDiseaseDto);
    return await this.diseaseRepository.save(disease);
  }

  async remove(id: number) {
    const disease = await this.diseaseRepository.findOne({
      where: {
        id,
      },
    });
    if (!disease) {
      throw new NotFoundException(`Disease with ID ${id} not found`);
    }
    return await this.diseaseRepository.remove(disease);
  }

  async findByText(text: string) {
    return await this.diseaseRepository.find({
      where: [{ enfermedad: Like(`%${text}%`) }],
    });
  }
}
