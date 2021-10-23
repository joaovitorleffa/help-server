import { Transform } from 'class-transformer';
import { Cause } from 'src/causes/entities/cause.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class FeedbackImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }) =>
    value ? `${process.env.BASE_URL}/causes/feedback/${value}` : null,
  )
  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Cause, (cause) => cause.feedbackImages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  cause: Cause;
}
