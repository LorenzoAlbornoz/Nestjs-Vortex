import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';
import { Consultation } from 'src/consultation/entities/consultation.entity';

@Entity({ name: 'historyClinic' })
export class HistoryClinic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  antecedentes: string;

  @Column()
  diagnostico: string;

  @Column()
  tratamiento: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => Patient, (patient) => patient.historyClinic)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @OneToMany(() => Consultation, (consultation) => consultation.historyClinic)
  consultations: Consultation[];
}
