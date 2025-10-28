import {
    Model,
    Table,
    Column,
    DataType,
    BelongsTo,
} from "sequelize-typescript";
import type { UserId } from "../users/users.type";
import type { TeacherDisciplineId } from "./teacher-disciplines.type";
import type { DisciplineId } from "../disciplines/disciplines.type";
import { User } from "../users/users.model";
import { Discipline } from "../disciplines/disciplines.model";

interface ITeacherDisciplineAttrs {
    teacherDisciplineId: TeacherDisciplineId;
    teacherId: UserId;
    disciplineId: DisciplineId;
}

@Table({ tableName: "TeacherDisciplines", timestamps: false })
export class TeacherDiscipline extends Model<
    TeacherDiscipline,
    ITeacherDisciplineAttrs
> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "TeacherDisciplineID",
    })
    teacherDisciplineId: TeacherDisciplineId;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "TeacherID",
    })
    teacherId: UserId;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "DisciplineID",
    })
    disciplineId: DisciplineId;

    @BelongsTo(() => User, "teacherId")
    teacher: User;

    @BelongsTo(() => Discipline, "disciplineId")
    discipline: Discipline;
}
