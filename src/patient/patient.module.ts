import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { ConfigModule } from '@nestjs/config';
import { HistoryClinicModule } from 'src/history-clinic/history-clinic.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Patient]),
    HistoryClinicModule,
  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
