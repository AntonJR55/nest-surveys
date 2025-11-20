import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize";
import { Discipline } from "./disciplines.model";
import { GroupDiscipline } from "../group-disciplines/group-disciplines.model";
import { User } from "../users/users.model";
import { TeacherDiscipline } from "../teacher-disciplines/teacher-disciplines.model";
import { CreateDisciplineDto } from "./dto/create-discipline.dto";

@Injectable()
export class DisciplinesService {
    constructor(
        @InjectConnection() private readonly sequelize: Sequelize,
        @InjectModel(Discipline)
        private disciplineRepository: typeof Discipline,
        @InjectModel(TeacherDiscipline)
        private teacherDisciplineRepository: typeof TeacherDiscipline,
        @InjectModel(GroupDiscipline)
        private groupDisciplineRepository: typeof GroupDiscipline
    ) {}

    async createDiscipline(dto: CreateDisciplineDto) {
        let transaction: any;

        try {
            transaction = await this.sequelize.transaction();

            const discipline = await this.disciplineRepository.create(
                {
                    disciplineName: dto.disciplineName,
                },
                {
                    transaction,
                }
            );

            const teacherDisciplineRecords = dto.teachersIds.map(
                (teacherId) => ({
                    disciplineId: discipline.disciplineId,
                    teacherId,
                })
            );
            await this.teacherDisciplineRepository.bulkCreate(
                teacherDisciplineRecords,
                {
                    transaction,
                }
            );

            const groupDisciplineRecords = dto.groupsCodes.map((groupCode) => ({
                disciplineId: discipline.disciplineId,
                groupCode,
            }));
            await this.groupDisciplineRepository.bulkCreate(
                groupDisciplineRecords,
                {
                    transaction,
                }
            );

            await transaction.commit();

            return {
                status: "success",
                message: "Дисциплина успешно создана",
            };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async getAllDisciplinesWithGroupsAndTeachers() {
        try {
            const disciplines = await this.disciplineRepository.findAll({
                include: [
                    {
                        model: GroupDiscipline,
                        attributes: ["groupCode"],
                    },
                    {
                        model: TeacherDiscipline,
                        include: [
                            {
                                model: User,
                                attributes: ["userId", "userName"],
                            },
                        ],
                    },
                ],
            });

            return disciplines.map((discipline) => {
                const plainDiscipline = discipline.toJSON();
                return {
                    disciplineId: plainDiscipline.disciplineId,
                    disciplineName: plainDiscipline.disciplineName,
                    groups:
                        plainDiscipline.groupDisciplines?.map((gd: any) => ({
                            groupCode: gd.groupCode,
                        })) || [],
                    teachers:
                        plainDiscipline.teacherDisciplines?.map((td: any) => ({
                            userId: td.teacher?.userId,
                            userName: td.teacher?.userName,
                        })) || [],
                };
            });
        } catch (error) {
            throw new Error(`Ошибка при получении дисциплин: ${error.message}`);
        }
    }
}
