import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { HistoryClinicService } from './history-clinic.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('History-Clinic')
@Auth(Role.SECRETARY)
@Controller('history-clinic')
export class HistoryClinicController {
  constructor(private readonly historyClinicService: HistoryClinicService) {}

  @Get()
  async findAll() {
    return await this.historyClinicService.findAll();
  }

  @Get(':id')
  async findPatientHistoryById(
    @Param('id') historyClinicId: string,
    @Query('type') type: 'practice' | 'consultation',
    @Query('fromDate') fromDate: Date,
    @Query('toDate') toDate: Date,
  ) {
    const patientHistory =
      await this.historyClinicService.findPatientHistoryById(+historyClinicId);

    if (!patientHistory) {
      return undefined;
    }

    if (type) {
      patientHistory.entries = patientHistory.entries.filter(
        (entry) => entry.type === type,
      );
    }

    if (fromDate && toDate) {
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);
      patientHistory.entries = patientHistory.entries.filter((entry) => {
        const entryDate = new Date(entry.data.fecha);
        return entryDate >= fromDateObj && entryDate <= toDateObj;
      });
    }

    return patientHistory;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.historyClinicService.remove(+id);
  }
}
