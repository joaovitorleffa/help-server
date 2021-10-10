import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserType } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  find(id) {
    return this.userRepository.find(id);
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  findByEmail(email: string, userType: UserType) {
    return this.userRepository.findOne({
      where: { email, userType },
    });
  }
}
