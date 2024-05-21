import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { AuthGuard } from 'src/auth/guards/access-token.guard';

@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post('/entry/:entryId/disease/:diseaseId')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  findAll() {
    return this.consultationService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.consultationService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateConsultationDto: UpdateConsultationDto,
  ) {
    return this.consultationService.update(+id, updateConsultationDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.consultationService.remove(+id);
  }
}
