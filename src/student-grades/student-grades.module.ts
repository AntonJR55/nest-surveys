import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { StudentGradesService } from "./student-grades.service";
import { StudentGradesController } from "./student-grades.controller";
import { StudentGrade } from "./student-grades.model";

@Module({
    imports: [SequelizeModule.forFeature([StudentGrade])],
    providers: [StudentGradesService],
    controllers: [StudentGradesController],
})
export class StudentGradesModule {}
