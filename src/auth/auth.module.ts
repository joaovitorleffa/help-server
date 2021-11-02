import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { PersonsModule } from 'src/persons/persons.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    OrganizationsModule,
    PersonsModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
