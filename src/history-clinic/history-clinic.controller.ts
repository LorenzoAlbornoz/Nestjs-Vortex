import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HistoryClinicService } from './history-clinic.service';
import { CreateHistoryClinicDto } from './dto/create-history-clinic.dto';
import { UpdateHistoryClinicDto } from './dto/update-history-clinic.dto';
import { AuthGuard } from 'src/auth/guards/access-token.guard';

@Controller('history-clinic')
export class HistoryClinicController {
  constructor(private readonly historyClinicService: HistoryClinicService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createHistoryClinicDto: CreateHistoryClinicDto) {
    return await this.historyClinicService.create(createHistoryClinicDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.historyClinicService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.historyClinicService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateHistoryClinicDto: UpdateHistoryClinicDto,
  ) {
    return await this.historyClinicService.update(+id, updateHistoryClinicDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    return await this.historyClinicService.remove(+id);
  }
}
