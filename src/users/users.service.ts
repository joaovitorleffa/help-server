import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  find(id) {
    return this.userRepository.find(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }
}
