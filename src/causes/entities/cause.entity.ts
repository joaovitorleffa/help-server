import { CauseComment } from 'src/cause-comments/entities/cause-comment.entity';
import { FeedbackImage } from 'src/feedback-images/entities/feedback-image.entity';
import { Organization } from 'src/organizations/entities/organization.entity';
import { Person } from 'src/persons/entities/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Type {
  DONATION = 'donation',
  VOLUNTARY_WORK = 'voluntary_work',
}

@Entity()
export class Cause {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ length: 450 })
  description: string;

  @Column({
    type: 'enum',
    enum: Type,
    default: Type.DONATION,
  })
  type: Type;

  @Column({ length: 450, nullable: true })
  feedback: string;

  @Column('timestamp')
  endAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Organization, (organization) => organization.causes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  organization: Organization;

  @OneToMany(() => FeedbackImage, (feedbackImage) => feedbackImage.cause)
  feedbackImages: FeedbackImage[];

  @ManyToMany(() => Person, (person) => person.favorites)
  causeFavorite: Person[];

  @OneToMany(() => CauseComment, (causeComment) => causeComment.cause)
  causeComments: CauseComment[];
}
