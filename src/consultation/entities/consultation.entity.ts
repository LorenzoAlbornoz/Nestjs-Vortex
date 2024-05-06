import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HistoryClinic } from '../../history-clinic/entities/history-clinic.entity';

@Entity({ name: 'consultation' })
export class Consultation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ type: 'text', nullable: true })
  sintomas: string;

  @Column({ type: 'text', nullable: true })
  examenesRealizados: string;

  @Column({ type: 'text', nullable: true })
  diagnostico: string;

  @Column({ type: 'text', nullable: true })
  tratamiento: string;

  @Column({ type: 'text', nullable: true })
  notasMedico: string;

  @Column({ name: 'historyClinic_id' })
  historyClinicId: number;

  @ManyToOne(
    () => HistoryClinic,
    (historyClinic) => historyClinic.consultations,
  )
  @JoinColumn({ name: 'historyClinic_id' })
  historyClinic: HistoryClinic;
}
