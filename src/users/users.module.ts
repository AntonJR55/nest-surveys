import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import { Role } from "../roles/roles.model";
import { GroupStudent } from "../group-students/group-students.model";
import { StudentGrade } from "../student-grades/student-grades.model";
import { TeacherDiscipline } from "../teacher-disciplines/teacher-disciplines.model";
import { Discipline } from "../disciplines/disciplines.model";
import { Group } from "../groups/groups.model";
import { GroupDiscipline } from "../group-disciplines/group-disciplines.model";
import { Survey } from "../surveys/surveys.model";
import { Question } from "../questions/questions.model";
import { QuestionOption } from "../question-options/question-options.model";

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports: [
        SequelizeModule.forFeature([
            User,
            Role,
            GroupStudent,
            GroupDiscipline,
            Group,
            StudentGrade,
            TeacherDiscipline,
            Discipline,
            Survey,
            Question,
            QuestionOption,
        ]),
    ],
    exports: [UsersService],
})
export class UsersModule {}
