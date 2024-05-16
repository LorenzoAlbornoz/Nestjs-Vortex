import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Consultation } from './entities/consultation.entity';
import { Repository } from 'typeorm';
import { Entry } from 'src/entry/entities/entry.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Disease } from 'src/disease/entities/disease.entity';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectRepository(Consultation)
    private consultationRepository: Repository<Consultation>,
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    @InjectRepository(Disease)
    private diseaseRepository: Repository<Disease>,
  ) {}

  async create(
    entryId: number,
    diseaseId: number,
    createConsultationDto: CreateConsultationDto,
  ) {
    const entry = await this.entryRepository.findOne({
      where: { id: entryId },
    });
    if (!entry) {
      throw new NotFoundException(`Entry with ID ${entryId} not found`);
    }

    const disease = await this.diseaseRepository.findOne({
      where: { id: diseaseId },
    });
    if (!disease) {
      throw new NotFoundException(`Disease with ID ${diseaseId} not found`);
    }

    const consultation = new Consultation();
    consultation.entry = entry;
    consultation.disease = disease;
    consultation.motivoDeConsulta = createConsultationDto.motivoDeConsulta;
    consultation.diagnostico = createConsultationDto.diagnostico;
    consultation.confimacionDeDiagnostico =
      createConsultationDto.confimacionDeDiagnostico;
    consultation.notasMedico = createConsultationDto.notasMedico;

    return this.consultationRepository.save(consultation);
  }

  async findAll() {
    return await this.consultationRepository.find({
      relations: {
        disease: true,
        entry: true,
      }
    });
  }

  async findOne(id: number) {
    const consultation = await this.consultationRepository.findOne({
      where: {
        id,
      },
      relations: ['disease', 'entry']
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
