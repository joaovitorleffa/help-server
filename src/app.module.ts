import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CausesModule } from './causes/causes.module';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
  imports: [CausesModule, TypeOrmModule.forRoot(), OrganizationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
