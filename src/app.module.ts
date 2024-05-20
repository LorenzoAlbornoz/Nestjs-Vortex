import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../config/config';
import { PatientModule } from './patient/patient.module';
import { HistoryClinicModule } from './history-clinic/history-clinic.module';
import { ConsultationModule } from './consultation/consultation.module';
import { DoctorModule } from './doctor/doctor.module';
import { PracticeModule } from './practice/practice.module';
import { EntryModule } from './entry/entry.module';
import { DiseaseModule } from './disease/disease.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    PatientModule,
    HistoryClinicModule,
    ConsultationModule,
    PracticeModule,
    EntryModule,
    DoctorModule,
    DiseaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
