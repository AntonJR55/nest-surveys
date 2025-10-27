import {
    Model,
    Table,
    Column,
    DataType,
    BelongsTo,
} from "sequelize-typescript";
import type {
    SurveyCreatedByTeacherID,
    SurveyCreatedDate,
    SurveyEndDate,
    SurveyId,
    SurveyName,
} from "../types/surveys";
import type { DisciplineId } from "../types/disciplines";
import { Discipline } from "../disciplines/disciplines.model";
import { User } from "../users/models/users.model";

interface ISurveyAttrs {
    surveyId: SurveyId;
    surveyName: SurveyName;
    surveyEndDate: SurveyEndDate;
    surveyCreatedDate: SurveyCreatedDate;
    surveyCreatedByTeacherID: SurveyCreatedByTeacherID;
    disciplineId: DisciplineId;
}

@Table({ tableName: "Surveys", timestamps: false })
export class Survey extends Model<Survey, ISurveyAttrs> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "SurveyID",
    })
    surveyId: SurveyId;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "SurveyName",
    })
    surveyName: SurveyName;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: "SurveyEndDate",
    })
    surveyEndDate: SurveyEndDate;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: "SurveyCreatedDate",
    })
    surveyCreatedDate: SurveyCreatedDate;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "SurveyCreatedByTeacherID",
    })
    surveyCreatedByTeacherID: SurveyCreatedByTeacherID;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "DisciplineID",
    })
    disciplineId: DisciplineId;

    @BelongsTo(() => Discipline, "disciplineId")
    discipline: Discipline;

    @BelongsTo(() => User, "surveyCreatedByTeacherID")
    user: User;
}
