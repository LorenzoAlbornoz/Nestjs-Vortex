import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { HistoryClinic } from 'src/history-clinic/entities/history-clinic.entity';
import { Entry } from './entities/entry.entity';
import { Consultation } from 'src/consultation/entities/consultation.entity';
import { Practice } from 'src/practice/entities/practice.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/patient/entities/patient.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      Entry,
      HistoryClinic,
      Consultation,
      Practice,
      Patient,
      Doctor,
    ]),
    AuthModule,
  ],
  controllers: [EntryController],
  providers: [EntryService],
})
export class EntryModule {}
