import { Module } from '@nestjs/common';
import { TeacherDisciplinesService } from './teacher-disciplines.service';
import { TeacherDisciplinesController } from './teacher-disciplines.controller';

@Module({
  providers: [TeacherDisciplinesService],
  controllers: [TeacherDisciplinesController]
})
export class TeacherDisciplinesModule {}
