import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Consultation } from './entities/consultation.entity';
import { Disease } from 'src/disease/entities/disease.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Entry } from 'src/entry/entities/entry.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Consultation, Disease, Doctor, Entry]),
  ],
  controllers: [ConsultationController],
  providers: [ConsultationService],
})
export class ConsultationModule {}
