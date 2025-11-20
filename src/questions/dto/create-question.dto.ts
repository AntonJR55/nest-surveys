import { CreateQuestionOptionDto } from "../../question-options/dto/create-question-option.dto";
import { QuestionPoints, QuestionText } from "../questions.type";

export class CreateQuestionDto {
    readonly questionText: QuestionText;
    readonly questionPoints: QuestionPoints;
    readonly questionOptions: CreateQuestionOptionDto[];
}
