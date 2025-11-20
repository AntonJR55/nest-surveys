import { Module } from "@nestjs/common";
import { SurveysService } from "./surveys.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Survey } from "./surveys.model";
import { Question } from "../questions/questions.model";
import { QuestionOption } from "../question-options/question-options.model";
import { SurveysController } from "./surveys.controller";
import { TeacherDiscipline } from "../teacher-disciplines/teacher-disciplines.model";

@Module({
    imports: [
        SequelizeModule.forFeature([
            Survey,
            Question,
            QuestionOption,
            TeacherDiscipline,
        ]),
    ],
    controllers: [SurveysController],
    providers: [SurveysService],
})
export class SurveysModule {}
