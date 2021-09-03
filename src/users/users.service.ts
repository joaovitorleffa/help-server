import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserType } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      name: 'john',
      userType: UserType.ORGANIZATION,
      password: '123456',
      email: 'teste',
      createdAt: '312312',
      updatedAt: '312312',
      emailVerifiedAt: new Date(),
    },
    {
      id: 2,
      name: 'john 2',
      email: 'teste',
      userType: UserType.ORGANIZATION,
      password: '123456',
      emailVerifiedAt: new Date(),
      createdAt: '312321',
      updatedAt: '312312',
    },
  ];

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(name: string): Promise<User | undefined> {
    return this.users.find((user) => user.name === name);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
