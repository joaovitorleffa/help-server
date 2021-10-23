import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('organization/login')
  @UseInterceptors(ClassSerializerInterceptor)
  async organizationLogin(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.organizationLogin(authLoginDto);
  }

  @Post('person/login')
  @UseInterceptors(ClassSerializerInterceptor)
  async personLogin(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.personLogin(authLoginDto);
  }
}
