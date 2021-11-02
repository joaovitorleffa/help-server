import { Module } from '@nestjs/common';
import { CauseCommentsService } from './cause-comments.service';
import { CauseCommentsController } from './cause-comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CauseComment } from './entities/cause-comment.entity';
import { CausesModule } from 'src/causes/causes.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([CauseComment]), CausesModule, UsersModule],
  controllers: [CauseCommentsController],
  providers: [CauseCommentsService],
})
export class CauseCommentsModule {}
