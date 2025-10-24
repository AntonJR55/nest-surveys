import { Model, Table, Column, DataType } from "sequelize-typescript";
import type { DisciplineId, DisciplineName } from "../types/disciplines";

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
}
