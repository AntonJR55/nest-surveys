import { CreateQuestionOptionDto } from "../../question-options/dto/create-question-option.dto";
import { SurveyId } from "../../surveys/surveys.type";
import { QuestionPoints, QuestionText } from "../questions.type";

export class CreateQuestionDto {
    readonly surveyId: SurveyId;
    readonly questionText: QuestionText;
    readonly questionPoints: QuestionPoints;
    readonly questionOptions: CreateQuestionOptionDto[];
}
