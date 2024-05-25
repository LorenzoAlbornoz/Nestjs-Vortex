import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EntryService } from './entry.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Auth(Role.SECRETARY)
@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post('/historyClinic/:historyClinicId/doctor/:doctorId')
  create(
    @Param('historyClinicId') historyClinicId: string,
    @Param('doctorId') doctorId: string,
  ) {
    return this.entryService.create(+historyClinicId, +doctorId);
  }

  @Get()
  findAll() {
    return this.entryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entryService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entryService.remove(+id);
  }
}
