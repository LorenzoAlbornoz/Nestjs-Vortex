import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';
import { Entry } from 'src/entry/entities/entry.entity';

@Entity({ name: 'historyClinic' })
export class HistoryClinic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => Patient, (patient) => patient.historyClinic)
  @JoinColumn()
  patient: Patient;

  @OneToMany(() => Entry, (entry) => entry.historyClinic)
  entry: Entry[];

}
