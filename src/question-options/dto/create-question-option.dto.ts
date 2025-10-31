import { QuestionId } from "../../questions/questions.type";
import { IsAnswer, OptionText } from "../question-options.type";

export class CreateQuestionOptionDto {
    readonly questionId: QuestionId;
    readonly optionText: OptionText;
    readonly isAnswer: IsAnswer;
}
