import {
    Model,
    Table,
    Column,
    DataType,
    BelongsTo,
} from "sequelize-typescript";
import type { TeacherDisciplineId, UserId } from "../../types/users";
import type { DisciplineId } from "../../types/disciplines";
import { User } from "./users.model";
import { Discipline } from "../../disciplines/disciplines.model";

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
