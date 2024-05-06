import { Module } from '@nestjs/common';
import { HistoryClinicService } from './history-clinic.service';
import { HistoryClinicController } from './history-clinic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HistoryClinic } from './entities/history-clinic.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Consultation } from 'src/consultation/entities/consultation.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([HistoryClinic, Patient, Consultation]),
  ],
  controllers: [HistoryClinicController],
  providers: [HistoryClinicService],
})
export class HistoryClinicModule {}
