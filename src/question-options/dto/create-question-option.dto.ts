import { IsAnswer, OptionText } from "../question-options.type";

export class CreateQuestionOptionDto {
    readonly optionText: OptionText;
    readonly isAnswer: IsAnswer;
}
