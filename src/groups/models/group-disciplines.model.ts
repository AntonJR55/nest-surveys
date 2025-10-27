import {
    Model,
    Table,
    Column,
    DataType,
    BelongsTo,
} from "sequelize-typescript";
import type { GroupCode, GroupDisciplineId } from "../../types/groups";
import type { DisciplineId } from "../../types/disciplines";
import { Group } from "./groups.model";
import { Discipline } from "../../disciplines/disciplines.model";

interface IGroupDisciplineAttrs {
    groupDisciplineId: GroupDisciplineId;
    groupCode: GroupCode;
    disciplineId: DisciplineId;
}

@Table({ tableName: "GroupDisciplines", timestamps: false })
export class GroupDiscipline extends Model<
    GroupDiscipline,
    IGroupDisciplineAttrs
> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "GroupDisciplineID",
    })
    groupDisciplineId: GroupDisciplineId;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "GroupCode",
    })
    groupCode: GroupCode;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: "DisciplineID",
    })
    disciplineId: DisciplineId;

    @BelongsTo(() => Group)
    group: Group;

    @BelongsTo(() => Discipline)
    discipline: Discipline;
}
