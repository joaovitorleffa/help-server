import { Cause } from 'src/causes/entities/cause.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CauseComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Cause, (cause) => cause.causeComments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cause: Cause;

  @ManyToOne(() => User, (user) => user.causeComments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
