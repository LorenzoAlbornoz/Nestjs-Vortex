// practice.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PracticeService } from './practice.service';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { AuthGuard } from 'src/auth/guards/access-token.guard';

@Controller('practice')
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Post('/entry/:entryId')
  @UseGuards(AuthGuard)
  create(
    @Param('entryId')
    entryId: string,
    @Body() createPracticeDto: CreatePracticeDto,
  ) {
    return this.practiceService.create(+entryId, createPracticeDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.practiceService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.practiceService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updatePracticeDto: UpdatePracticeDto,
  ) {
    return this.practiceService.update(+id, updatePracticeDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.practiceService.remove(+id);
  }
}
