import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Practice } from './entities/practice.entity';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { Entry } from 'src/entry/entities/entry.entity';
import { UpdatePracticeDto } from './dto/update-practice.dto';

@Injectable()
export class PracticeService {
  constructor(
    @InjectRepository(Practice)
    private practiceRepository: Repository<Practice>,
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
  ) {}

  async create(entryId: number, createPracticeDto: CreatePracticeDto) {
    const entry = await this.entryRepository.findOne({
      where: { id: entryId },
    });
    if (!entry) {
      throw new NotFoundException(`Entry with ID ${entryId} not found`);
    }

    const practice = new Practice();
    practice.entry = entry;
    practice.duracionDelProcedimiento =
      createPracticeDto.duracionDelProcedimiento;
    practice.complicaciones = createPracticeDto.complicaciones;
    practice.resultadoFinal = createPracticeDto.resultadoFinal;
    practice.notasMedico = createPracticeDto.notasMedico;

    // Guardar la práctica en la base de datos
    return this.practiceRepository.save(practice);
  }

  async findAll() {
    return await this.practiceRepository.find();
  }

  async findOne(id: number) {
    const practice = await this.practiceRepository.findOne({
      where: {
        id,
      },
    });
    if (!practice) {
      throw new NotFoundException(`Practice with ID ${id} not found`);
    }
    return practice;
  }

  async update(id: number, updatePracticeDto: UpdatePracticeDto) {
    const practice = await this.practiceRepository.findOne({
      where: {
        id,
      },
    });
    if (!practice) {
      throw new NotFoundException(`Practice with ID ${id} not found`);
    }

    // Update practice properties
    practice.duracionDelProcedimiento =
      updatePracticeDto.duracionDelProcedimiento;
    practice.complicaciones = updatePracticeDto.complicaciones;
    practice.resultadoFinal = updatePracticeDto.resultadoFinal;
    practice.notasMedico = updatePracticeDto.notasMedico;

    // Save the updated practice
    return await this.practiceRepository.save(practice);
  }

  async remove(id: number) {
    const practice = await this.practiceRepository.findOne({
      where: {
        id,
      },
    });
    if (!practice) {
      throw new NotFoundException(`Practice with ID ${id} not found`);
    }
    await this.practiceRepository.remove(practice);
  }
}
