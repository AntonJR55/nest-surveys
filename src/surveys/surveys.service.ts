import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Survey } from "./surveys.model";
import { Question } from "../questions/questions.model";
import { QuestionOption } from "../question-options/question-options.model";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import { Transaction } from "sequelize";

@Injectable()
export class SurveysService {
    constructor(
        @InjectModel(Survey)
        private surveyRepository: typeof Survey,
        @InjectModel(Question)
        private questionRepository: typeof Question,
        @InjectModel(QuestionOption)
        private readonly questionOptionRepository: typeof QuestionOption
    ) {}
}
