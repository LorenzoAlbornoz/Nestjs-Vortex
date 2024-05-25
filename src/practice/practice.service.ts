import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Practice } from './entities/practice.entity';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { Entry } from 'src/entry/entities/entry.entity';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { EntryType } from 'src/common/enums/entry-type.enum';

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
    practice.duracionDelProcedimiento =
      createPracticeDto.duracionDelProcedimiento;
    practice.complicaciones = createPracticeDto.complicaciones;
    practice.resultadoFinal = createPracticeDto.resultadoFinal;
    practice.notasMedico = createPracticeDto.notasMedico;

    const createdAt = new Date();
    entry.type = EntryType.PRACTICE;
    // Guardar los datos de la consulta en el campo 'type' de Entry
    entry.data = {
      duracionDelProcedimiento: practice.duracionDelProcedimiento,
      complicaciones: practice.complicaciones,
      resultadoFinal: practice.resultadoFinal,
      notasMedico: practice.notasMedico,
      fecha: createdAt.toISOString()
    };

    // Guardar la entrada actualizada
    await this.entryRepository.save(entry);

    // Guardar la consulta en la tabla 'consultation'
    return await this.practiceRepository.save(practice);
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
