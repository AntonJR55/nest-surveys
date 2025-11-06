import { SurveyId } from "../../surveys/surveys.type";
import { UserId } from "../../users/users.type";
import { Grade } from "../student-grades.type";

export class SaveStudentGradeDto {
    readonly studentId: UserId;
    readonly surveyId: SurveyId;
    readonly grade: Grade;
}
