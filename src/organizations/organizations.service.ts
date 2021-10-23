import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Organization } from './entities/organization.entity';
import { User, UserType } from 'src/users/entities/user.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

import { unlink } from 'fs/promises';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    const user = await this.createUser(createOrganizationDto);

    return await this.createOrganization(createOrganizationDto, user);
  }

  async createUser(createOrganizationDto: CreateOrganizationDto) {
    const { email, password } = createOrganizationDto;

    const newUser = this.userRepository.create({
      email,
      password,
      userType: UserType.ORGANIZATION,
    });
    const user = await this.userRepository.save(newUser);

    return user;
  }

  async createOrganization(
    createOrganizationDto: CreateOrganizationDto,
    user: User,
  ) {
    const data = { ...createOrganizationDto, user };

    const newOrganization = this.organizationRepository.create(data);
    const organization = await this.organizationRepository.save(
      newOrganization,
    );

    return organization;
  }

  async findById(id: number) {
    return this.organizationRepository.findOneOrFail(id);
  }

  async findByUserId(userId: number) {
    return this.organizationRepository.findOne({ where: { user: userId } });
  }

  async updateProfileImage(userId: number, fileName: string) {
    const { id, profileImage } = await this.findByUserId(userId);
    if (profileImage) {
      try {
        await unlink(`./uploads/organization/images/${profileImage}`);
      } catch (err) {
        throw err;
      }
    }
    await this.organizationRepository.update(id, { profileImage: fileName });
  }

  async updateOne(userId: number, organization: UpdateOrganizationDto) {
    const { id } = await this.findByUserId(userId);
    await this.organizationRepository.update(id, organization);
  }
}
