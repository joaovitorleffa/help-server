import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Organization } from './entities/organization.entity';
import { User, UserType } from 'src/users/entities/user.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

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

    const newOrganization = this.organizationRepository.create({
      ...createOrganizationDto,
      user,
    });
    const organization = await this.organizationRepository.save(
      newOrganization,
    );

    return organization;
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

  async findByUserId(userId: number) {
    return this.organizationRepository.findOne({ where: { user: userId } });
  }

  async updateProfileImage(id: number, profileImage: string) {
    await this.organizationRepository.update(id, { profileImage });
  }

  async updateOne(id: number, organization: UpdateOrganizationDto) {
    await this.organizationRepository.update(id, organization);
  }
}
