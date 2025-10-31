import { Model, Table, Column, DataType } from "sequelize-typescript";
import type { RoleName } from "./roles.type";

interface IRoleAttrs {
    roleNameEN: RoleName;
    roleNameRU: RoleName;
}

@Table({ tableName: "Roles", timestamps: false })
export class Role extends Model<Role, IRoleAttrs> {
    @Column({
        type: DataType.STRING(25),
        primaryKey: true,
        allowNull: false,
        field: "RoleNameEN",
    })
    roleNameEn: RoleName;

    @Column({
        type: DataType.STRING(25),
        primaryKey: true,
        allowNull: false,
        field: "RoleNameRU",
    })
    roleNameRu: RoleName;
}
