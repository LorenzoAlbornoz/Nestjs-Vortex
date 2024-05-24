import { Role } from 'src/common/enums/rol.enum';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Role } from '../../common/enums/rol.enum';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: 'secretary' })
  role: string;

  // lo elimino pero sigo teniendo un registro(me puede servir para futuros estudios)
  @DeleteDateColumn()
  deletedAt: Date;
}
