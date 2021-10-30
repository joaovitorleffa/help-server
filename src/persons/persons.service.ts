import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlink } from 'fs/promises';

import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { User, UserType } from 'src/users/entities/user.entity';
import { CausesService } from 'src/causes/causes.service';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private causeService: CausesService,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const user = await this.createUser(createPersonDto);

    const newPerson = this.personRepository.create({
      ...createPersonDto,
      user,
    });

    const person = await this.personRepository.save(newPerson);

    return person;
  }

  async createUser(createPersonDto: CreatePersonDto) {
    const { email, password } = createPersonDto;

    const newUser = this.userRepository.create({
      email,
      password,
      userType: UserType.PERSON,
    });

    const user = await this.userRepository.save(newUser);

    return user;
  }

  async updateProfileImage(userId: number, fileName: string) {
    const { id, profileImage } = await this.findByUserId(userId);
    if (profileImage) {
      try {
        await unlink(`./uploads/persons/images/${profileImage}`);
      } catch (err) {
        throw err;
      }
    }
    await this.personRepository.update(id, { profileImage: fileName });
  }

  async findByUserId(userId: number) {
    return this.personRepository.findOne({ where: { user: userId } });
  }

  async createFavorite(causeId: number, personId: number): Promise<Person> {
    const cause = await this.causeService.findById(causeId);

    return this.personRepository
      .findOne({
        relations: ['favorites'],
        where: { id: personId },
      })
      .then((person) => {
        person.favorites.push(cause);
        return this.personRepository.save(person);
      });
  }

  async findFavorites(personId: number) {
    const [result] = await this.personRepository
      .createQueryBuilder('person')
      .leftJoinAndSelect('person.favorites', 'favorites')
      .where({ id: personId })
      .getMany();

    return result.favorites;
  }
}
