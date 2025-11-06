import {
    Model,
    Table,
    Column,
    DataType,
    BelongsTo,
} from "sequelize-typescript";
import type {
    IsAnswer,
    OptionText,
    QuestionOptionId,
} from "./question-options.type";
import type { QuestionId } from "../questions/questions.type";
import { Question } from "../questions/questions.model";

interface IQuestionOptionAttrs {
    questionOptionId?: QuestionOptionId;
    questionId: QuestionId;
    optionText: OptionText;
    isAnswer: IsAnswer;
}

@Table({ tableName: "QuestionOptions", timestamps: false })
export class QuestionOption extends Model<
    QuestionOption,
    IQuestionOptionAttrs
> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "QuestionOptionID",
    })
    questionOptionId: QuestionOptionId;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "QuestionID",
    })
    questionId: QuestionId;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "OptionText",
    })
    optionText: OptionText;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "IsAnswer",
    })
    isAnswer: IsAnswer;

    @BelongsTo(() => Question, "questionId")
    question: Question;
}
