import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { CausesModule } from './causes/causes.module';
import { configuration } from './configs/configuration';
import { validationSchema } from './configs/validation';
import { PersonsModule } from './persons/persons.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { FeedbackImagesModule } from './feedback-images/feedback-images.module';
import { IsEmailAlreadyExistsConstraint } from './users/decorators/validation.decorator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'uploads'),
    }),
    TypeOrmModule.forRoot(),
    CausesModule,
    OrganizationsModule,
    AuthModule,
    UsersModule,
    FeedbackImagesModule,
    PersonsModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsEmailAlreadyExistsConstraint],
})
export class AppModule {}
