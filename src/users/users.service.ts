import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateStudentDto } from "./dto/create-student.dto";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { GroupStudent } from "../group-students/group-students.model";
import { Password, UserId, UserName } from "./users.type";
import { Survey } from "../surveys/surveys.model";
import { Discipline } from "../disciplines/disciplines.model";
import { TeacherDiscipline } from "../teacher-disciplines/teacher-disciplines.model";
import { GroupDiscipline } from "../group-disciplines/group-disciplines.model";
import { Op, Sequelize } from "sequelize";
import { GroupCode } from "../groups/groups.type";
import { DisciplineId } from "../disciplines/disciplines.type";
import { StudentGrade } from "../student-grades/student-grades.model";
import { SurveyId } from "../surveys/surveys.type";
import { Role } from "../roles/roles.model";

@Injectable()
export class UsersService {
    constructor(
        @InjectConnection() private readonly sequelize: Sequelize,
        @InjectModel(User) private userRepository: typeof User,
        @InjectModel(GroupStudent)
        private groupStudentRepository: typeof GroupStudent
    ) {}

    async createStudent(dto: CreateStudentDto) {
        const transaction = await this.sequelize.transaction();

        try {
            const student = await this.userRepository.create(
                {
                    userName: dto.userName,
                    roleNameEn: dto.roleNameEn,
                },
                { transaction }
            );

            const studentData = student.toJSON();

            const groupStudent = await this.groupStudentRepository.create(
                {
                    groupCode: dto.groupCode,
                    studentId: studentData.userId,
                },
                { transaction }
            );

            const groupStudentData = groupStudent.toJSON();

            await transaction.commit();

            return {
                studentData,
                groupStudentData,
            };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async createEmployee(dto: CreateEmployeeDto) {
        try {
            await this.userRepository.create(dto);

            return {
                status: "success",
                message: "Пользователь успешно создан",
            };
        } catch (error) {
            throw error;
        }
    }

    async getAllTeachers() {
        const teachers = await this.userRepository.findAll({
            where: {
                roleNameEn: {
                    [Op.eq]: "teacher",
                },
            },
            attributes: {
                exclude: ["password", "roleNameEn"],
            },
        });

        return teachers;
    }

    async getAllUsersWithGroups() {
        const users = await this.userRepository.findAll({
            include: [
                {
                    model: Role,
                    as: "role",
                },
                {
                    model: GroupStudent,
                    as: "groupStudents",
                    required: false,
                },
            ],
        });

        const usersFormatted = users.map((user) => {
            const userData = user.toJSON();

            let groupCode: string | null = null;
            if (
                userData.roleNameEn === "student" &&
                userData.groupStudents?.length > 0
            ) {
                groupCode = userData.groupStudents[0].groupCode;
            }

            return {
                userId: userData.userId,
                userName: userData.userName,
                role: {
                    roleNameEn: userData.role?.roleNameEn,
                    roleNameRu: userData.role?.roleNameRu,
                },
                groupCode: groupCode,
            };
        });

        return usersFormatted;
    }

    async getUserByUserName(userName: UserName) {
        const user = await this.userRepository.findOne({
            where: { userName },
        });

        return user;
    }

    async createPassword(userName: UserName, hashedPassword: Password) {
        const [affectedCount] = await this.userRepository.update(
            { password: hashedPassword },
            {
                where: {
                    userName,
                },
            }
        );

        return affectedCount > 0;
    }

    async getTeacherData(userWithoutPassword: any) {
        const userId = userWithoutPassword.userId;

        const additionalData = await Promise.all([
            Survey.findAll({
                where: { surveyCreatedByTeacherID: userId },
                include: [{ model: Discipline, as: "discipline" }],
            }),
            Discipline.findAll({
                include: [
                    {
                        model: TeacherDiscipline,
                        as: "teacherDisciplines",
                        where: { teacherId: userId },
                    },
                ],
            }),
        ]);
        const [surveys, disciplines] = additionalData;

        return {
            status: "success",
            userData: {
                ...userWithoutPassword,
                availableSurveys: surveys.map((s) => {
                    const surveyData = s.get({ plain: true });
                    const {
                        surveyCreatedByTeacherID,
                        disciplineId,
                        discipline,
                        ...cleanSurvey
                    } = surveyData;

                    return {
                        ...cleanSurvey,
                        surveyCreatedBy: {
                            teacherId: userId,
                            teacherName: userWithoutPassword.userName,
                        },
                        surveyOnDiscipline: discipline,
                    };
                }),
                availableDisciplines: disciplines.map((d) => {
                    const disciplineData = d.get({ plain: true });
                    const { teacherDisciplines, ...cleanDiscipline } =
                        disciplineData;

                    return cleanDiscipline;
                }),
            },
        };
    }

    async getStudentData(userWithoutPassword: any) {
        try {
            const userId = userWithoutPassword.userId;

            const groupStudent = await GroupStudent.findOne({
                where: { studentId: userId },
            });

            let groupCode: GroupCode | null = null;
            let availableDisciplines: any[] = [];
            let availableSurveys: any[] = [];
            let studentGrades: any[] = [];

            if (groupStudent) {
                const groupStudentPlain = groupStudent.get({ plain: true });
                groupCode = groupStudentPlain.groupCode as GroupCode;

                if (groupCode && typeof groupCode === "string") {
                    [availableDisciplines, studentGrades] = await Promise.all([
                        this.getGroupDisciplines(groupCode),
                        this.getStudentGrades(userId),
                    ]);

                    const availableDisciplinesIds = availableDisciplines
                        .map((availableDiscipline) => {
                            const disciplineId =
                                availableDiscipline.getDataValue(
                                    "disciplineId"
                                );
                            return disciplineId;
                        })
                        .filter((id) => id !== undefined && id !== null);

                    const completedSurveysIds = studentGrades
                        .map((grade) => grade.getDataValue("surveyId"))
                        .filter((id) => id !== undefined && id !== null);

                    availableSurveys = await this.getAvailableSurveysByGroup(
                        availableDisciplinesIds,
                        completedSurveysIds
                    );
                }
            }

            return this.formatStudentLoginResponse(
                userWithoutPassword,
                groupCode,
                availableDisciplines,
                availableSurveys,
                studentGrades
            );
        } catch (error) {
            console.error("Error in getStudentData:", error);
            return this.formatStudentLoginResponse(
                userWithoutPassword,
                null,
                [],
                [],
                []
            );
        }
    }

    private async getGroupDisciplines(groupCode: GroupCode) {
        try {
            const disciplines = await GroupDiscipline.findAll({
                where: { groupCode },
                include: [
                    {
                        model: Discipline,
                        as: "discipline",
                    },
                ],
            });

            return disciplines;
        } catch (error) {
            console.error("Error in getGroupDisciplines:", error);
            return [];
        }
    }

    private async getAvailableSurveysByGroup(
        availableDisciplinesIds: DisciplineId[],
        completedSurveysIds: SurveyId[]
    ) {
        try {
            if (availableDisciplinesIds.length === 0) {
                return [];
            }

            const whereCondition: any = {
                disciplineId: { [Op.in]: availableDisciplinesIds },
                surveyEndDate: {
                    [Op.gt]: Sequelize.literal("GETDATE()"),
                },
            };

            if (completedSurveysIds.length > 0) {
                whereCondition.surveyId = {
                    [Op.notIn]: completedSurveysIds,
                };
            }

            const availableSurveys = await Survey.findAll({
                where: whereCondition,
                include: [
                    {
                        model: Discipline,
                        as: "discipline",
                        required: true,
                    },
                    {
                        model: User,
                        as: "user",
                        attributes: ["userId", "userName"],
                    },
                ],
            });

            return availableSurveys;
        } catch (error) {
            console.error("Error in getActiveSurveysByGroup:", error);
            return [];
        }
    }

    private async getStudentGrades(studentId: UserId) {
        try {
            const studentGrades = await StudentGrade.findAll({
                where: { studentId: studentId },
                include: [
                    {
                        model: Survey,
                        as: "survey",
                        include: [
                            {
                                model: Discipline,
                                as: "discipline",
                                required: true,
                            },
                            {
                                model: User,
                                as: "user",
                                attributes: ["userId", "userName"],
                            },
                        ],
                    },
                ],
            });

            return studentGrades;
        } catch (error) {
            console.error("Error in getCompletedSurveys:", error);
            return [];
        }
    }

    private formatStudentLoginResponse(
        userWithoutPassword: any,
        groupCode: GroupCode | null,
        availableDisciplines: any[],
        availableSurveys: any[],
        studentGrades: any[]
    ) {
        return {
            status: "success",
            userData: {
                ...userWithoutPassword,
                groupCode: groupCode,
                availableDisciplines: availableDisciplines.map(
                    (availableDiscipline) => {
                        const availableDisciplinePlain =
                            availableDiscipline.get({ plain: true });
                        const discipline = availableDisciplinePlain.discipline;

                        return {
                            disciplineId: discipline.disciplineId,
                            disciplineName: discipline.disciplineName,
                        };
                    }
                ),
                availableSurveys: availableSurveys.map((availableSurvey) => {
                    const surveyPlain = availableSurvey.get({ plain: true });

                    return {
                        surveyId: surveyPlain.surveyId,
                        surveyName: surveyPlain.surveyName,
                        surveyCreatedDate: surveyPlain.surveyCreatedDate,
                        surveyEndDate: surveyPlain.surveyEndDate,
                        surveyCreatedBy: {
                            teacherId: surveyPlain.user.userId,
                            teacherName: surveyPlain.user.userName,
                        },
                        surveyOnDiscipline: {
                            disciplineId: surveyPlain.discipline.disciplineId,
                            disciplineName:
                                surveyPlain.discipline.disciplineName,
                        },
                    };
                }),
                studentGrades: studentGrades.map((grade) => {
                    const gradePlain = grade.get({ plain: true });
                    const survey = gradePlain.survey;

                    return {
                        survey: {
                            surveyId: survey.surveyId,
                            surveyName: survey.surveyName,
                            surveyCreatedDate: survey.surveyCreatedDate,
                            surveyEndDate: survey.surveyEndDate,
                            surveyCreatedBy: {
                                teacherId: survey.user.userId,
                                teacherName: survey.user.userName,
                            },
                            surveyOnDiscipline: {
                                disciplineId: survey.discipline.disciplineId,
                                disciplineName:
                                    survey.discipline.disciplineName,
                            },
                        },
                        grade: gradePlain.grade,
                    };
                }),
            },
        };
    }
}
