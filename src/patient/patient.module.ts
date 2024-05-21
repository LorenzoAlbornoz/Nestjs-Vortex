import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { ConfigModule } from '@nestjs/config';
import { HistoryClinic } from 'src/history-clinic/entities/history-clinic.entity';
import { Entry } from 'src/entry/entities/entry.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Patient, HistoryClinic, Entry]),
    AuthModule,
  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [TypeOrmModule],
})
export class PatientModule {}
