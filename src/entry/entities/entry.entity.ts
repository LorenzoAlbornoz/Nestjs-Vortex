import { EntryType } from 'src/common/enums/entry-type.enum';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { HistoryClinic } from 'src/history-clinic/entities/history-clinic.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'entries' })
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => HistoryClinic, (historyClinic) => historyClinic.entries)
  @JoinColumn()
  historyClinic: HistoryClinic;

  @ManyToOne(() => Doctor, (doctor) => doctor.entry, { onDelete: 'SET NULL' })
  @JoinColumn()
  doctor: Doctor;

  @Column({ nullable: true })
  type: EntryType;

  @Column({ type: 'jsonb', nullable: true })
  data: any;
}
