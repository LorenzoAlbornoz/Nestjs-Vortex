import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HistoryClinicService } from './history-clinic.service';
import { CreateHistoryClinicDto } from './dto/create-history-clinic.dto';
import { UpdateHistoryClinicDto } from './dto/update-history-clinic.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Auth(Role.SECRETARY)
@Controller('history-clinic')
export class HistoryClinicController {
  constructor(private readonly historyClinicService: HistoryClinicService) {}

  @Post()
  async create(@Body() createHistoryClinicDto: CreateHistoryClinicDto) {
    return await this.historyClinicService.create(createHistoryClinicDto);
  }

  @Get()
  async findAll() {
    return await this.historyClinicService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.historyClinicService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHistoryClinicDto: UpdateHistoryClinicDto,
  ) {
    return await this.historyClinicService.update(+id, updateHistoryClinicDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.historyClinicService.remove(+id);
  }
}
