import { Module } from '@nestjs/common';
import { QuestionOptionsService } from './question-options.service';
import { QuestionOptionsController } from './question-options.controller';

@Module({
  providers: [QuestionOptionsService],
  controllers: [QuestionOptionsController]
})
export class QuestionOptionsModule {}
