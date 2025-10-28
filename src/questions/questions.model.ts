import {
    Model,
    Table,
    Column,
    DataType,
    BelongsTo,
    HasMany,
} from "sequelize-typescript";
import type {
    QuestionAnswer,
    QuestionId,
    QuestionText,
} from "./questions.type";
import type { SurveyId } from "../surveys/surveys.type";
import { Survey } from "../surveys/surveys.model";
import { QuestionOption } from "../question-options/question-options.model";

interface IQuestionAttrs {
    questionId: QuestionId;
    surveyId: SurveyId;
    questionText: QuestionText;
}

@Table({ tableName: "Questions", timestamps: false })
export class Question extends Model<Question, IQuestionAttrs> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "QuestionID",
    })
    questionId: QuestionId;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "SurveyID",
    })
    surveyId: SurveyId;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "QuestionText",
    })
    questionText: QuestionText;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "QuestionAnswer",
    })
    questionAnswer: QuestionAnswer;

    @HasMany(() => QuestionOption, "questionId")
    options: QuestionOption[];

    @BelongsTo(() => Survey, "surveyId")
    survey: Survey;

    @BelongsTo(() => QuestionOption, "questionAnswer")
    questionOption: QuestionOption;
}
