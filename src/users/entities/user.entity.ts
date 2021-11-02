import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { CauseComment } from 'src/cause-comments/entities/cause-comment.entity';
import { Person } from 'src/persons/entities/person.entity';
import { Organization } from 'src/organizations/entities/organization.entity';

export enum UserType {
  ORGANIZATION = 'organization',
  PERSON = 'person',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: UserType })
  userType: UserType;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ type: 'timestamp', nullable: true })
  emailVerifiedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @OneToMany(() => CauseComment, (causeComment) => causeComment.user)
  causeComments: CauseComment;

  @OneToOne(() => Person, (person) => person.user)
  person: Person;

  @OneToOne(() => Organization, (organization) => organization.user)
  organization: Organization;
}
