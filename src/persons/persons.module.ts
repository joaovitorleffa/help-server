import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Person } from './entities/person.entity';
import { PersonsService } from './persons.service';
import { User } from 'src/users/entities/user.entity';
import { PersonsController } from './persons.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Person, User])],
  controllers: [PersonsController],
  providers: [PersonsService],
})
export class PersonsModule {}
