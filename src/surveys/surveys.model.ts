import {
    Model,
    Table,
    Column,
    DataType,
    BelongsTo,
    HasMany,
} from "sequelize-typescript";
import type {
    SurveyCreatedByTeacherID,
    SurveyCreatedDate,
    SurveyEndDate,
    SurveyId,
    SurveyName,
} from "./surveys.type";
import type { DisciplineId } from "../disciplines/disciplines.type";
import { Discipline } from "../disciplines/disciplines.model";
import { User } from "../users/users.model";
import { Question } from "../questions/questions.model";
import { StudentGrade } from "../student-grades/student-grades.model";

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

    @HasMany(() => Question, "surveyId")
    questions: Question[];

    @HasMany(() => StudentGrade, "surveyId")
    studentsGrades: StudentGrade[];
}
