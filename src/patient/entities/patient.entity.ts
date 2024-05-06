import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { HistoryClinic } from '../../history-clinic/entities/history-clinic.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';

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

  @ManyToMany(() => Doctor, (doctor) => doctor.patients)
  @JoinTable({
    name: 'patient_doctor',
    joinColumn: {
      name: 'patient_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'patient_doctor_patient_id'
    },
    inverseJoinColumn: {
      name: 'doctor_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'patient_doctor_doctor_id'
    }
  })
  doctors: Doctor[]
}
