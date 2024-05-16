import { Entry } from 'src/entry/entities/entry.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'practice' })
export class Practice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column()
  duracionDelProcedimiento: string;

  @Column()
  complicaciones: string;

  @Column()
  resultadoFinal: string;

  @Column()
  notasMedico: string;

  @ManyToOne(() => Entry, (entry) => entry.practices)
  @JoinColumn()
  entry: Entry;
}
