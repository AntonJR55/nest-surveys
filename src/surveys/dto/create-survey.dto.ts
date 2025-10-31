import { DisciplineId } from "../../disciplines/disciplines.type";
import { CreateQuestionDto } from "../../questions/dto/create-question.dto";
import { UserId } from "../../users/users.type";
import { SurveyEndDate, SurveyName } from "../surveys.type";

export class CreateSurveyDto {
    readonly surveyName: SurveyName;
    readonly surveyEndDate: SurveyEndDate;
    readonly surveyCreatedByTeacherID: UserId;
    readonly disciplineId: DisciplineId;
    readonly questions: CreateQuestionDto[];
}
