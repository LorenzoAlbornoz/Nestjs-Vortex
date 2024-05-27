import { Controller, Get, Post, Param, Delete, Query } from '@nestjs/common';
import { EntryService } from './entry.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { Entry } from './entities/entry.entity';
import { EntryType } from 'src/common/enums/entry-type.enum';

@Auth(Role.SECRETARY)
@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post('/historyClinic/:historyClinicId/doctor/:doctorId')
  create(
    @Param('historyClinicId') historyClinicId: number,
    @Param('doctorId') doctorId: number,
  ) {
    return this.entryService.create(+historyClinicId, +doctorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entryService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entryService.remove(+id);
  }

  @Get()
  findEntries(
    @Query('type') type?: EntryType,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('doctorId') doctorId?: number,
    @Query('specialty') specialty?: string,
    @Query('includeDeleted') includeDeleted?: boolean,
    @Query('socialWork') socialWork?: string,
    @Query('dni') dni?: string,
    @Query('diagnosis') diagnosis?: string,
    @Query('complication') complication?: boolean,
  ): Promise<Entry[]> {
    const dniArray = Array.isArray(dni) ? dni : dni ? [dni] : undefined;
    return this.entryService.findAll(
      type,
      from ? new Date(from) : undefined,
      to ? new Date(to) : undefined,
      doctorId,
      specialty,
      includeDeleted,
      socialWork,
      dniArray,
      diagnosis,
      complication,
    );
  }
}
