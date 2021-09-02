import { Organization } from 'src/organizations/entities/organization.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum Type {
  DONATION = 'donation',
  VOLUNTARY_WORK = 'voluntary_work',
}

@Entity()
export class Cause {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: Type,
    default: Type.DONATION,
  })
  type: Type;

  @Column('timestamp')
  expired_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Organization, (organization) => organization.causes)
  organization: Organization;
}
