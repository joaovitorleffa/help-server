import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { PersonsService } from 'src/persons/persons.service';
import { User, UserType } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private personService: PersonsService,
    private organizationsService: OrganizationsService,
    private jwtService: JwtService,
  ) {}

  async personLogin(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto, UserType.PERSON);
    const person = await this.personService.findByUserId(user.id);
    const signResponse = this.sign(user, UserType.PERSON, person.id);
    return { person, ...signResponse };
  }

  async organizationLogin(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto, UserType.ORGANIZATION);
    const organization = await this.organizationsService.findByUserId(user.id);
    const signResponse = this.sign(
      user,
      UserType.ORGANIZATION,
      organization.id,
    );
    return { organization, ...signResponse };
  }

  sign(user: User, type: UserType, actorId: number) {
    const payload = {
      userId: user.id,
      email: user.email,
      userType: user.userType,
      ...(type === UserType.ORGANIZATION
        ? { organizationId: actorId }
        : { personId: actorId }),
    };

    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    authLoginDto: AuthLoginDto,
    userType: UserType,
  ): Promise<User> {
    const { email, password } = authLoginDto;
    const user = await this.userService.findByEmail(email, userType);

    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
