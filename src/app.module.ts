import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { CausesModule } from './causes/causes.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { IsEmailAlreadyExistsConstraint } from './users/decorators/validation.decorator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    CausesModule,
    OrganizationsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsEmailAlreadyExistsConstraint],
})
export class AppModule {}
