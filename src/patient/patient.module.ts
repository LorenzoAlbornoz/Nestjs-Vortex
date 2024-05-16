import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { ConfigModule } from '@nestjs/config';
import { HistoryClinic } from 'src/history-clinic/entities/history-clinic.entity';
import { Entry } from 'src/entry/entities/entry.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Patient, HistoryClinic, Entry]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [TypeOrmModule],
})
export class PatientModule {}
