// practice.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { PracticeService } from './practice.service';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';

@Controller('practice')
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Post('/entry/:entryId')
  create(
    @Param('entryId') entryId: string,
    @Body() createPracticeDto: CreatePracticeDto,
  ) {
    return this.practiceService.create(+entryId, createPracticeDto);
  }

  @Get()
  findAll() {
    return this.practiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.practiceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePracticeDto: UpdatePracticeDto,
  ) {
    return this.practiceService.update(+id, updatePracticeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.practiceService.remove(+id);
  }
}
