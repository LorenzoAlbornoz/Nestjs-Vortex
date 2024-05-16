import { Consultation } from 'src/consultation/entities/consultation.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { HistoryClinic } from 'src/history-clinic/entities/history-clinic.entity';
import { Practice } from 'src/practice/entities/practice.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'entry' })
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @ManyToOne(() => HistoryClinic, (historyClinic) => historyClinic.entry)
  @JoinColumn()
  historyClinic: HistoryClinic;

  @OneToMany(() => Consultation, (consultation) => consultation.entry)
  @JoinColumn()
  consultations: Consultation[];
  
  @OneToMany(() => Practice, (practice) => practice.entry)
  @JoinColumn()
  practices: Practice[];

  @ManyToOne(() => Doctor, (doctor) => doctor.entry)
  @JoinColumn()
  doctor: Doctor;
}
