import {
    Model,
    Table,
    Column,
    DataType,
    BelongsTo,
} from "sequelize-typescript";
import type { Grade, StudentGradeId } from "./student-grades.type";
import type { UserId } from "../users/users.type";
import type { SurveyId } from "../surveys/surveys.type";
import { User } from "../users/users.model";
import { Survey } from "../surveys/surveys.model";

interface IStudentGradeAttrs {
    studentGradeId: StudentGradeId;
    studentId: UserId;
    surveyId: SurveyId;
    grade: Grade;
}

@Table({ tableName: "StudentGrades", timestamps: false })
export class StudentGrade extends Model<StudentGrade, IStudentGradeAttrs> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "StudentGradeID",
    })
    studentGradeId: StudentGradeId;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "StudentID",
    })
    studentId: UserId;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "SurveyID",
    })
    surveyId: SurveyId;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "Grade",
    })
    grade: Grade;

    @BelongsTo(() => User, "studentId")
    student: User;

    @BelongsTo(() => Survey, "surveyId")
    survey: Survey;
}
