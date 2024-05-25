import { Disease } from 'src/disease/entities/disease.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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
  confirmacionDeDiagnostico: string;

  @Column()
  notasMedico: string;

  @ManyToOne(() => Disease, (disease) => disease.consultation)
  @JoinColumn()
  disease: Disease;

}
