import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HistoryClinic } from 'src/history-clinic/entities/history-clinic.entity';
import { Consultation } from './entities/consultation.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Consultation, HistoryClinic]),
  ],
  controllers: [ConsultationController],
  providers: [ConsultationService],
})
export class ConsultationModule {}
