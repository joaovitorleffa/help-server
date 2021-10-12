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
import { OrganizationsModule } from './organizations/organizations.module';
import { FeedbackImagesModule } from './feedback-images/feedback-images.module';
import { IsEmailAlreadyExistsConstraint } from './users/decorators/validation.decorator';
import { configuration } from './configs/configuration';
import { validationSchema } from './configs/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrations: ['dist/db/migrations/*.js'],
      cli: {
        migrationsDir: 'src/db/migrations',
      },
    }),
    CausesModule,
    OrganizationsModule,
    AuthModule,
    UsersModule,
    FeedbackImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsEmailAlreadyExistsConstraint],
})
export class AppModule {}
