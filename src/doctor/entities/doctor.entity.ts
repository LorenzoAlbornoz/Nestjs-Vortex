import { Entry } from 'src/entry/entities/entry.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'doctors' })
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  numeroDeMatricula: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  specialty: string;

  @Column()
  fechaDeIngreso: Date;

  @OneToMany(() => Entry, (entry) => entry.doctor, { onDelete: 'SET NULL' })
  entry: Entry[];
}
