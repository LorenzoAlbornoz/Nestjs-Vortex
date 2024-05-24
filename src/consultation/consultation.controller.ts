import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Auth(Role.SECRETARY)
@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post('/entry/:entryId/disease/:diseaseId')
  create(
    @Param('entryId') entryId: string,
    @Param('diseaseId') diseaseId: string,
    @Body() createConsultationDto: CreateConsultationDto,
  ) {
    return this.consultationService.create(
      +entryId,
      +diseaseId,
      createConsultationDto,
    );
  }

  @Get()
  findAll() {
    return this.consultationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConsultationDto: UpdateConsultationDto,
  ) {
    return this.consultationService.update(+id, updateConsultationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultationService.remove(+id);
  }
}
