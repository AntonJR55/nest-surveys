import { Module } from '@nestjs/common';
import { StudentGradesService } from './student-grades.service';
import { StudentGradesController } from './student-grades.controller';

@Module({
  providers: [StudentGradesService],
  controllers: [StudentGradesController]
})
export class StudentGradesModule {}
