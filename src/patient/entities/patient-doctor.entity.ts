import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'patient_doctor' })
export class PacientDoctor {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ default: 'active' })
  public status: string;
}
