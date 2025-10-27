import {
    Model,
    Table,
    Column,
    DataType,
    BelongsToMany,
    HasMany,
} from "sequelize-typescript";
import type { DisciplineId, DisciplineName } from "../types/disciplines";
import { Group } from "../groups/models/groups.model";
import { GroupDiscipline } from "../groups/models/group-disciplines.model";
import { User } from "../users/models/users.model";
import { TeacherDiscipline } from "../users/models/teacher-disciplines.model";

interface IDisciplineAttrs {
    disciplineId: DisciplineId;
    disciplineName: DisciplineName;
}

@Table({ tableName: "Disciplines", timestamps: false })
export class Discipline extends Model<Discipline, IDisciplineAttrs> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "DisciplineID",
    })
    disciplineId: DisciplineId;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "DisciplineName",
    })
    disciplineName: DisciplineName;

    @BelongsToMany(
        () => Group,
        () => GroupDiscipline,
        "DisciplineId",
        "GroupCode"
    )
    groups: Group[];

    @HasMany(() => TeacherDiscipline, "disciplineId")
    teacherDisciplines: TeacherDiscipline[];

    @BelongsToMany(
        () => User,
        () => TeacherDiscipline,
        "disciplineId",
        "teacherId"
    )
    teachers: User[];
}
