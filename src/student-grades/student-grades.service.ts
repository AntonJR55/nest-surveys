import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { StudentGrade } from "./student-grades.model";
import { User } from "../users/users.model";
import { Group } from "../groups/groups.model";
import { GroupStudent } from "../group-students/group-students.model";
import { SaveStudentGradeDto } from "./dto/save-student-grade.dto";
import { SurveyId } from "../surveys/surveys.type";
import { Survey } from "../surveys/surveys.model";
import { UserId } from "../users/users.type";

@Injectable()
export class StudentGradesService {
    constructor(
        @InjectModel(StudentGrade)
        private studentGradeRepository: typeof StudentGrade,
        @InjectModel(User)
        private userRepository: typeof User,
        @InjectModel(GroupStudent)
        private groupStudentRepository: typeof GroupStudent,
        @InjectModel(Group)
        private groupRepository: typeof Group,
        @InjectModel(Survey)
        private surveyRepository: typeof Survey
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

    async getStudentsGradesBySurveyId(surveyId: SurveyId) {
        try {
            const studentGrades = await this.studentGradeRepository.findAll({
                where: { surveyId },
                include: [
                    {
                        model: this.userRepository,
                        attributes: ["userId", "userName"],
                    },
                    {
                        model: this.surveyRepository,
                        attributes: ["surveyId", "surveyName"],
                    },
                ],
            });

            if (studentGrades.length === 0) return [];

            const studentIds = studentGrades.map((grade) =>
                grade.get("studentId")
            );
            const studentsWithGroups = await this.getStudentsGroups(studentIds);

            return studentGrades.map((grade) => {
                const studentId = grade.get("studentId");
                const studentGroups =
                    studentsWithGroups.find((s) => s.studentId === studentId)
                        ?.groups || [];

                const groupCode =
                    studentGroups.length > 0
                        ? studentGroups[0].groupCode
                        : null;

                const studentData = grade.getDataValue("student");

                return {
                    studentGradeId: grade.get("studentGradeId"),
                    student: studentData
                        ? {
                              userId: studentData.get("userId"),
                              userName: studentData.get("userName"),
                          }
                        : null,
                    groupCode: groupCode,
                    grade: grade.get("grade"),
                };
            });
        } catch (error) {
            console.error("Error:", error);
            throw new Error(`Ошибка при получении данных: ${error.message}`);
        }
    }

    private async getStudentsGroups(studentIds: UserId[]) {
        if (studentIds.length === 0) return [];

        const groupStudents = await this.groupStudentRepository.findAll({
            where: { studentId: studentIds },
            include: [{ model: this.groupRepository }],
        });

        const grouped = groupStudents.reduce((acc, groupStudent) => {
            const studentId = groupStudent.get("studentId");
            const groupData = groupStudent.getDataValue("group");

            if (!acc[studentId]) {
                acc[studentId] = [];
            }

            if (groupData) {
                const groupCode = groupData.get("groupCode");
                acc[studentId].push({
                    groupCode: groupCode,
                });
            }

            return acc;
        }, {});

        return Object.keys(grouped).map((studentId) => ({
            studentId: parseInt(studentId),
            groups: grouped[studentId],
        }));
    }
}
