import { Module } from '@nestjs/common';
import { CausesService } from './causes.service';
import { CausesController } from './causes.controller';

@Module({
  controllers: [CausesController],
  providers: [CausesService]
})
export class CausesModule {}
