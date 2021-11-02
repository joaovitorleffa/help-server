import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserType } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async find(id: number): Promise<User[]> {
    return await this.userRepository.find({ id });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ id });
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
