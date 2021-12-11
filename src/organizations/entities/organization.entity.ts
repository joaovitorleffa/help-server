import { Transform } from 'class-transformer';
import { MaxLength } from 'class-validator';
import { Cause } from 'src/causes/entities/cause.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  @MaxLength(450, { message: 'long_description' })
  description: string;

  @Transform(({ value }) => (value ? `${process.env.BASE_URL}/organization/images/${value}` : null))
  @Column({ nullable: true })
  profileImage: string;

  @Column({ length: 13 })
  phoneNumber: string;

  @Column({ length: 8 })
  cep: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column({ length: 14 })
  number: string;

  @Column({ type: 'boolean', default: true })
  isApproved: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Cause, (cause) => cause.organization)
  causes: Cause[];

  @OneToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  user: User;
}
