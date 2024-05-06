import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { ConfigModule } from '@nestjs/config';
import { HistoryClinic } from 'src/history-clinic/entities/history-clinic.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Patient, HistoryClinic, Doctor]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
