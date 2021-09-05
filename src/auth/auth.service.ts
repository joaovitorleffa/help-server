import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserType } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async personLogin(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto, UserType.PERSON);
    return this.sign(user);
  }

  async organizationLogin(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto, UserType.ORGANIZATION);
    return this.sign(user);
  }

  sign(user: User) {
    const payload = {
      userId: user.id,
    };

    console.log(this.jwtService.sign(payload));

    return {
      user,
      access_token: this.jwtService.sign(payload),
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
