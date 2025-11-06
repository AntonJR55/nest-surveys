import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { StudentGrade } from "./student-grades.model";
import { SaveStudentGradeDto } from "./dto/save-student-grade.dto";

@Injectable()
export class StudentGradesService {
    constructor(
        @InjectModel(StudentGrade)
        private studentGradeRepository: typeof StudentGrade
    ) {}

    async saveStudentGrade(dto: SaveStudentGradeDto) {
        try {
            await this.studentGradeRepository.create({
                studentId: dto.studentId,
                surveyId: dto.surveyId,
                grade: dto.grade,
            });

            return {
                message: "Сохранение оценки студента выполнено успешно",
            };
        } catch (error) {
            console.error("Error saving student grade:", error);
            throw error;
        }
    }
}
