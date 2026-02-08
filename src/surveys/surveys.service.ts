import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize";
import { Survey } from "./surveys.model";
import { Question } from "../questions/questions.model";
import { QuestionOption } from "../question-options/question-options.model";
import { CreateSurveyDto } from "./dto/create-survey.dto";
import type { SurveyId } from "./surveys.type";

@Injectable()
export class SurveysService {
  constructor(
    @InjectConnection() private readonly sequelize: Sequelize,
    @InjectModel(Survey)
    private surveyRepository: typeof Survey,
    @InjectModel(Question)
    private questionRepository: typeof Question,
    @InjectModel(QuestionOption)
    private readonly questionOptionRepository: typeof QuestionOption
  ) {}

  async getSurveyData(surveyId: SurveyId) {
    try {
      return await this.surveyRepository.findByPk(surveyId, {
        attributes: ["surveyId", "surveyName"],
        include: [
          {
            model: Question,
            attributes: ["questionId", "questionText", "questionPoints"],
            include: [
              {
                model: QuestionOption,
                attributes: ["questionOptionId", "optionText", "isAnswer"],
              },
            ],
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching survey:", error);
      throw error;
    }
  }

  async createSurvey(createSurveyDto: CreateSurveyDto) {
    let transaction: any;

    if (!this.sequelize) {
      throw new Error("Sequelize not initialized");
    }

    try {
      transaction = await this.sequelize.transaction();

      const currentDate = new Date();

      const survey = await this.surveyRepository.create(
        {
          surveyName: createSurveyDto.surveyName,
          surveyEndDate: new Date(createSurveyDto.surveyEndDate),
          surveyCreatedDate: currentDate,
          surveyCreatedByTeacherID: createSurveyDto.surveyCreatedByTeacherID,
          disciplineId: createSurveyDto.disciplineId,
        },
        {
          transaction,
        }
      );

      for (const questionDto of createSurveyDto.questions) {
        const question = await this.questionRepository.create(
          {
            surveyId: survey.surveyId,
            questionText: questionDto.questionText,
            questionPoints: questionDto.questionPoints,
          },
          { transaction }
        );

        const questionOptions = questionDto.questionOptions.map(
          (optionDto) => ({
            questionId: question.questionId,
            optionText: optionDto.optionText,
            isAnswer: optionDto.isAnswer,
          })
        );

        await this.questionOptionRepository.bulkCreate(questionOptions, {
          transaction,
        });
      }

      await transaction.commit();

      return {
        status: "success",
        message: "Опрос успешно создан",
        createdSurvey: {
          surveyId: survey.surveyId,
          surveyName: createSurveyDto.surveyName,
          surveyEndDate: createSurveyDto.surveyEndDate,
          surveyCreatedDate: currentDate,
        },
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
