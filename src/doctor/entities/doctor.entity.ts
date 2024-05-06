import { Patient } from 'src/patient/entities/patient.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'doctors' })
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_doctor: string;

  @Column()
  specialty: string;

  @ManyToMany(() => Patient, (patient) => patient.doctors)
  patients: Patient[]
}
