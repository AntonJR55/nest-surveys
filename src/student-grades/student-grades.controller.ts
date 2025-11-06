import { Body, Controller, Post } from "@nestjs/common";
import { SaveStudentGradeDto } from "./dto/save-student-grade.dto";
import { StudentGradesService } from "./student-grades.service";

@Controller("student-grades")
export class StudentGradesController {
    constructor(private studentGradesService: StudentGradesService) {}

    @Post()
    saveStudentGrade(@Body() dto: SaveStudentGradeDto) {
        return this.studentGradesService.saveStudentGrade(dto);
    }
}
