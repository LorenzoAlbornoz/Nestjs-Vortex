import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import { HistoryClinic } from '../../history-clinic/entities/history-clinic.entity';
@Entity({ name: 'patients' })
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  dni: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  fechaDeNacimiento: Date;

  @Column()
  obraSocial: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => HistoryClinic, (historyClinic) => historyClinic.patient)
  historyClinic: HistoryClinic;
}
