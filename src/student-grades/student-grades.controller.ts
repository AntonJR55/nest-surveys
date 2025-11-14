import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SaveStudentGradeDto } from "./dto/save-student-grade.dto";
import { StudentGradesService } from "./student-grades.service";
import type { SurveyId } from "../surveys/surveys.type";

@Controller("student-grades")
export class StudentGradesController {
    constructor(private studentGradesService: StudentGradesService) {}

    @Post()
    saveStudentGrade(@Body() dto: SaveStudentGradeDto) {
        return this.studentGradesService.saveStudentGrade(dto);
    }

    @Get("survey/:surveyId")
    getStudentsGradesBySurveyId(@Param("surveyId") surveyId: SurveyId) {
        return this.studentGradesService.getStudentsGradesBySurveyId(surveyId);
    }
}
