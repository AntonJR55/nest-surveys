import {
    Model,
    Table,
    Column,
    DataType,
    BelongsToMany,
} from "sequelize-typescript";
import type { GroupCode } from "../../types/groups";
import { Discipline } from "../../disciplines/disciplines.model";
import { GroupDiscipline } from "./group-disciplines.model";

interface IGroupAttrs {
    groupCode: GroupCode;
}

@Table({ tableName: "Groups", timestamps: false })
export class Group extends Model<Group, IGroupAttrs> {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
        field: "GroupCode",
    })
    groupCode: GroupCode;

    @BelongsToMany(
        () => Discipline,
        () => GroupDiscipline,
        "GroupCode",
        "DisciplineId"
    )
    disciplines: Discipline[];
}
