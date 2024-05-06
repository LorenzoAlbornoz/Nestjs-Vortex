import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Doctor } from './entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Doctor, Patient])],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
