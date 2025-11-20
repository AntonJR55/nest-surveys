import {
    Model,
    Table,
    Column,
    DataType,
    BelongsToMany,
    HasMany,
} from "sequelize-typescript";
import type { DisciplineId, DisciplineName } from "./disciplines.type";
import { GroupDiscipline } from "../group-disciplines/group-disciplines.model";
import { User } from "../users/users.model";
import { TeacherDiscipline } from "../teacher-disciplines/teacher-disciplines.model";

interface IDisciplineAttrs {
    disciplineId?: DisciplineId;
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
        type: DataType.STRING(100),
        allowNull: false,
        field: "DisciplineName",
    })
    disciplineName: DisciplineName;

    @HasMany(() => GroupDiscipline, "disciplineId")
    groupDisciplines: GroupDiscipline[];

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
