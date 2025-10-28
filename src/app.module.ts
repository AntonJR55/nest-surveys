import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { DisciplinesModule } from "./disciplines/disciplines.module";
import { UsersModule } from "./users/users.module";
import { GroupsModule } from "./groups/groups.module";
import { QuestionsModule } from "./questions/questions.module";
import { RolesModule } from "./roles/roles.module";
import { TeacherDisciplinesModule } from "./teacher-disciplines/teacher-disciplines.module";
import { QuestionOptionsModule } from "./question-options/question-options.module";
import { GroupDisciplinesModule } from "./group-disciplines/group-disciplines.module";
import { StudentGradesModule } from "./student-grades/student-grades.module";
import { GroupStudentsModule } from "./group-students/group-students.module";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env",
        }),
        SequelizeModule.forRoot({
            dialect: "mssql",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadModels: true,
        }),
        DisciplinesModule,
        UsersModule,
        GroupsModule,
        QuestionsModule,
        RolesModule,
        TeacherDisciplinesModule,
        GroupDisciplinesModule,
        QuestionOptionsModule,
        StudentGradesModule,
        GroupStudentsModule,
    ],
})
export class AppModule {}
