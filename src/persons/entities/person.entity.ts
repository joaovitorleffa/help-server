import { Transform } from 'class-transformer';
import { Cause } from 'src/causes/entities/cause.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Transform(({ value }) => (value ? `${process.env.BASE_URL}/persons/images/${value}` : null))
  @Column({ nullable: true })
  profileImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToMany(() => Cause, (cause) => cause.causeFavorite, { cascade: true })
  @JoinTable({
    name: 'person_favorites_cause',

    joinColumn: {
      name: 'personId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'causeId',
      referencedColumnName: 'id',
    },
  })
  favorites: Cause[];
}
