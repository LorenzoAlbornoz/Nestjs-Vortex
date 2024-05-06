import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { HistoryClinic } from '../../history-clinic/entities/history-clinic.entity';

@Entity({ name: 'patients' })
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'historyClinic_id' })
  historyClinicId: number;

  @OneToOne(() => HistoryClinic, (historyClinic) => historyClinic.patient)
  @JoinColumn({ name: 'historyClinic_id' })
  historyClinic: HistoryClinic;
}
