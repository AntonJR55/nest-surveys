import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { StudentGradesService } from "./student-grades.service";
import { StudentGradesController } from "./student-grades.controller";
import { StudentGrade } from "./student-grades.model";
import { User } from "../users/users.model";
import { Group } from "../groups/groups.model";
import { GroupStudent } from "../group-students/group-students.model";
import { Survey } from "../surveys/surveys.model";

@Module({
    imports: [
        SequelizeModule.forFeature([
            StudentGrade,
            User,
            Group,
            GroupStudent,
            Survey,
        ]),
    ],
    providers: [StudentGradesService],
    controllers: [StudentGradesController],
})
export class StudentGradesModule {}
