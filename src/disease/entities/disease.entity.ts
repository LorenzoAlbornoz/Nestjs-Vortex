import { Consultation } from 'src/consultation/entities/consultation.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'disease' })
export class Disease {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enfermedad: string;

  @OneToOne(() => Consultation, (consultation) => consultation.disease)
  consultation: Consultation;
}
