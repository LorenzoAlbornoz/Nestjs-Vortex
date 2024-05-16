import { Module } from '@nestjs/common';
import { DiseaseService } from './disease.service';
import { DiseaseController } from './disease.controller';
import { Disease } from './entities/disease.entity';
import { Consultation } from 'src/consultation/entities/consultation.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Disease, Consultation])],
  controllers: [DiseaseController],
  providers: [DiseaseService],
})
export class DiseaseModule {}
