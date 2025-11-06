import { Module } from "@nestjs/common";
import { SurveysService } from "./surveys.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Survey } from "./surveys.model";
import { Question } from "../questions/questions.model";
import { QuestionOption } from "../question-options/question-options.model";
import { SurveysController } from "./surveys.controller";

@Module({
    imports: [SequelizeModule.forFeature([Survey, Question, QuestionOption])],
    controllers: [SurveysController],
    providers: [SurveysService],
})
export class SurveysModule {}
