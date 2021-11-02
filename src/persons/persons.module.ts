import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Person } from './entities/person.entity';
import { PersonsService } from './persons.service';
import { User } from 'src/users/entities/user.entity';
import { PersonsController } from './persons.controller';
import { CausesModule } from 'src/causes/causes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Person, User]), CausesModule],
  controllers: [PersonsController],
  providers: [PersonsService],
  exports: [PersonsService],
})
export class PersonsModule {}
