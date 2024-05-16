import { Module } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { PracticeController } from './practice.controller';
import { Practice } from './entities/practice.entity';
import { Entry } from 'src/entry/entities/entry.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Practice, Entry, Doctor])],
  controllers: [PracticeController],
  providers: [PracticeService],
})
export class PracticeModule {}
