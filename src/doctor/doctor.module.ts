import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Doctor } from './entities/doctor.entity';
import { Entry } from 'src/entry/entities/entry.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Doctor, Entry])],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
