import { Cause } from 'src/causes/entities/cause.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 11 })
  phone_number: string;

  @Column()
  password: string;

  @Column({ length: 8 })
  cep: string;

  @Column()
  district: string;

  @Column({ length: 14 })
  number: string;

  @Column({ type: 'boolean', default: false })
  is_approved: boolean;

  @Column('timestamp')
  email_verified_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Cause, (cause) => cause.organization)
  causes: Cause[];
}
