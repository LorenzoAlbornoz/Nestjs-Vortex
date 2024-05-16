import { Disease } from 'src/disease/entities/disease.entity';
import { Entry } from 'src/entry/entities/entry.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'consultation' })
export class Consultation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column()
  motivoDeConsulta: string;

  @Column()
  diagnostico: string;

  @Column()
  confimacionDeDiagnostico: string;

  @Column()
  notasMedico: string;

  @ManyToOne(() => Disease, (disease) => disease.consultation)
  @JoinColumn()
  disease: Disease;

  @ManyToOne(() => Entry, (entry) => entry.consultations)
  @JoinColumn()
  entry: Entry;
}
